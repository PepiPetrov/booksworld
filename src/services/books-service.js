import { getDatabase, ref, child, get, push, remove, set } from "firebase/database"
import uniqid from 'uniqid'
import { removeAllCommentsForBook } from './comments-service'
import { uploadImage, removeImage, editImage } from './image-service'
import app from './firebase'

const db = getDatabase(app)
const dbRef = ref(db)

export async function getAll() {
    const snapshot = await get(child(dbRef, '/books'))
    if (snapshot.val() !== null) {
        const books = Object.values(snapshot.val()).sort((a, b) => a.title.localeCompare(b.title))
        return books
    }
    else {
        return null
    }
}

export async function getBook(id) {
    const books = await getAll()
    if (books !== null) {
        for (let book of books) {
            if (book._id === id) {
                return book
            }
        }
    }
}

export async function create(book, file) {
    const isExisting = await ifExists(book)
    if (!isExisting) {
        book.rating = []
        book.likes = []
        book.creator = localStorage.getItem('username')
        book._id = uniqid()
        book.createdOn = Date.now()
        await uploadImage(book._id, file)
        await push(child(dbRef, '/books'), book)
        return book._id
    } else {
        return null
    }
}

export async function edit(id, book, file) {
    const snapshot = await get(child(dbRef, '/books'))
    const vals = snapshot.val()
    for (let bookKey in snapshot.val()) {
        const bookCheck = vals[bookKey]
        if (bookCheck._id === id) {
            await set(child(dbRef, `books/${bookKey}`), book)
        }
    }
    if (file !== null) {
        await editImage(id, file)
    }
}

export async function removeBook(bookId) {
    const snapshot = await get(child(dbRef, '/books'))
    const vals = snapshot.val()
    const usersSnapshot = await get(child(dbRef, '/books'))
    const usersVals = usersSnapshot.val()
    for (let userKey in usersVals) {
        const user = usersVals[userKey]
        if (user.likes !== undefined) {
            if (user.likes.indexOf(bookId) !== -1) {
                user.likes.splice(user.likes.indexOf(bookId), 1)
                await set(child(dbRef, `/users/${userKey}`), user)
            }
        }
        if (usersVals[userKey]._id === localStorage.getItem('token')) {
            if (user.favourites !== undefined) {
                if (user.favourites.indexOf(bookId) !== -1) {
                    user.favourites.splice(user.likes.indexOf(bookId), 1)
                    await set(child(dbRef, `/users/${userKey}`), user)
                }
            }
        }
    }
    await removeAllCommentsForBook(bookId)
    await removeImage(bookId)
    for (let bookKey in vals) {
        if (vals[bookKey]._id === bookId) {
            await remove(child(dbRef, `books/${bookKey}`))
        }
    }
}

export async function getBySeries(name) {
    const allBooks = await getAll()
    const bookBySeries = allBooks
        .filter(x => x.series === name)
        .sort((a, b) => a.seriesNumber - b.seriesNumber)
    return bookBySeries
}

export async function addToFavourites(bookId) {
    const snapshot = await get(child(dbRef, '/users'))
    const users = snapshot.val()
    for (let userKey in users) {
        if (users[userKey]._id === localStorage.getItem('token')) {
            const user = users[userKey]
            if (user.favourites === undefined) {
                user.favourites = []
            }
            user.favourites.push(bookId)
            await set(child(dbRef, '/users/' + userKey), user)
        }
    }

}

export async function removeFromFavourites(bookId) {
    const snapshot = await get(child(dbRef, '/users'))
    const users = snapshot.val()
    for (let userKey in users) {
        if (users[userKey]._id === localStorage.getItem('token')) {
            const user = users[userKey]
            user.favourites = user.favourites.filter(x => x !== bookId)
            await set(child(dbRef, `/users/${userKey}`), user)
        }
    }
}

export async function addRating(bookId, value) {
    const book = await getBook(bookId)
    const snapshot = await get(child(dbRef, '/books'))
    const vals = snapshot.val()
    if (book.ratings === undefined) {
        book.ratings = []
    }
    book.ratings.push({ username: localStorage.getItem('username'), rating: value })
    for (let bookKey in snapshot.val()) {
        if (vals[bookKey]._id === bookId) {
            set(child(dbRef, `books/${bookKey}`), book).then(() => {
                console.log('hehhehheh')
            })
        }
    }
}

export async function like(bookId, setUser) {
    const book = await getBook(bookId)
    const snapshot = await get(child(dbRef, '/books'))
    const users = await get(child(dbRef, '/users'))
    const vals = snapshot.val()
    const usersVals = users.val()
    if (book.likes === undefined) {
        book.likes = []
    }
    book.likes.push(localStorage.getItem('username'))
    for (let bookKey in snapshot.val()) {
        if (vals[bookKey]._id === bookId) {
            await set(child(dbRef, `books/${bookKey}`), book)
        }
    }
    for (let userKey in users.val()) {
        if (usersVals[userKey]._id === localStorage.getItem('token')) {
            const user = usersVals[userKey]
            if (user.likes === undefined) {
                user.likes = []
            }
            user.likes.push(bookId)
            setUser(user)
            await set(child(dbRef, `users/${userKey}`), user)
        }
    }
}

export async function dislike(bookId) {
    const book = await getBook(bookId)
    const snapshot = await get(child(dbRef, '/books'))
    const vals = snapshot.val()
    const usersSnapshot = await get(child(dbRef, '/users'))
    const usersVals = usersSnapshot.val()
    book.likes.splice(book.likes.indexOf(localStorage.getItem('username')), 1)
    for (let bookKey in snapshot.val()) {
        if (vals[bookKey]._id === bookId) {
            await set(child(dbRef, `books/${bookKey}`), book)
        }
    }
    for (let userKey in usersVals) {
        if (usersVals[userKey]._id === localStorage.getItem('token')) {
            const user = usersVals[userKey]
            if (user.likes !== undefined) {
                if (user.likes.indexOf(bookId) !== -1) {
                    user.likes.splice(user.likes.indexOf(bookId), 1)
                    await set(child(dbRef, `users/${userKey}`), user)
                }
            }
        }
    }
}

export async function getNewestBooks() {
    const books = await getAll()
    const result = books ? books.sort((a, b) => b.createdOn - a.createdOn).slice(0, 12) : []

    return result
}

export async function getMostLikedBooks() {
    const books = await getAll()
    const result = books
        ? books.filter(x => x.likes).sort((a, b) => b.likes.length - a.likes.length).slice(0, 12)
        : []

    return result
}

export async function getBooksByUser(username) {
    const books = await getAll()

    return books.filter(x => x.creator === username)
}

export async function ifExists(book) {
    const books = await getAll()
    for (const bookCheck of books) {
        if (book.title === bookCheck.title) {
            return true
        }
    }

    return false
}