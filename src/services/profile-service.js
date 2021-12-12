import { getDatabase, ref, child, get, set, remove } from "firebase/database"
import app from './firebase'
import { getAll, getBook, removeBook, edit } from './books-service'
import { getAllComments, removeAllCommentsForBook, removeComment } from "./comments-service"

const db = getDatabase(app)
const dbRef = ref(db)

export async function getUserFavourites() {
    const snapshot = await get(child(dbRef, '/users'))
    const users = snapshot.val()
    let userId
    let favourites = []
    for (let userKey in users) {
        if (users[userKey]._id === localStorage.getItem('token')) {
            const user = users[userKey]
            userId = userKey
            if (user.favourites) {
                favourites = user.favourites
            }
        }
    }
    for (let id of favourites) {
        const book = await getBook(id)
        if (book === undefined) {
            favourites.splice(favourites.indexOf(id), 1)
        }
        const user = users[userId]
        user.favourites = favourites
        await set(child(dbRef, '/users/' + userId), user)
    }
    return favourites
}

export async function getCreatedBooks() {
    const books = await getAll()
    let created = []
    if (books !== null) {
        for (let book of books) {
            if (book.creator === localStorage.getItem('username')) {
                created.push(book)
            }
        }
    }
    return created
}

export async function getLikedBooks() {
    const books = await getAll()
    let liked = []
    if (books !== null) {
        for (let book of books) {
            if (book.likes !== undefined && book.likes.includes(localStorage.getItem('username'))) {
                liked.push(book)
            }
        }
    }
    return liked
}

export async function setUserPreferences({ authors, genres }) {
    const snapshot = await get(child(dbRef, '/users'))
    const users = snapshot.val()
    for (let userKey in users) {
        if (users[userKey]._id === localStorage.getItem('token')) {
            const user = users[userKey]
            user.preferences = { authors, genres }
            await set(child(dbRef, '/users/' + userKey), user)
        }
    }
}

export async function getUserPreferences() {
    const snapshot = await get(child(dbRef, '/users'))
    const users = snapshot.val()
    let preferences = {}
    for (let userKey in users) {
        if (users[userKey]._id === localStorage.getItem('token')) {
            const user = users[userKey]
            if (user.preferences) {
                preferences = user.preferences
            } else {
                preferences = { authors: [], genres: [] }
            }
        }
    }
    return preferences
}

export async function getRecommendedBooks() {
    const { genres, authors } = await getUserPreferences()
    const allBooks = await getAll()
    const recommendedBooks = []

    if (allBooks !== null) {
        if (genres && genres.length > 0) {
            for (let genre of genres) {
                const filteredBooks = allBooks.filter(x => x.genres.includes(genre))
                filteredBooks.map(x => {
                    recommendedBooks.push(x)
                    return x
                })
            }
        }
        if (authors && authors.length > 0) {
            for (let author of authors) {
                const filteredBooks = allBooks.filter(x => x.author === author)
                filteredBooks.map(x => {
                    recommendedBooks.push(x)
                    return x
                })
            }
        }
    }
    const set = new Set(recommendedBooks)
    return Array.from(set)
}

export async function removeProfile() {
    const books = await getAll()
    const usersSnap = await get(dbRef, '/users')
    const users = usersSnap.val()
    const comments = await getAllComments()
    for (const book of books) {
        if (book.creator === localStorage.getItem('username')) {
            await removeBook(book._id)
        }
        if (book.likes && book.likes.includes(localStorage.getItem('username'))) {
            book.likes.splice(book.likes.indexOf(localStorage.getItem('username')), 1)
            await edit(book._id, book)
        }
        await removeAllCommentsForBook(book._id)
    }

    for (const comment of comments) {
        if (comment.creator === localStorage.getItem('username')) {
            await removeComment(comment._id)
        }
    }

    for (const userId in users) {
        const user = users[userId]
        if (user._id === localStorage.getItem('token')) {
            await remove(child(dbRef, '/users/' + userId))
        }
    }



}