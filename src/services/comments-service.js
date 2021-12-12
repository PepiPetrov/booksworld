import { getDatabase, ref, child, get, push, remove, set } from "firebase/database"
import uniqid from 'uniqid'
import app from './firebase'

const db = getDatabase(app)
const dbRef = ref(db)

export async function getAllComments(bookId) {
    const snapshot = await get(child(dbRef, '/comments'))
    if (snapshot.val() === null) {
        return []
    } else {
        return Object.values(snapshot.val())
    }
}

export async function getCommentsByBook(bookId) {
    const snapshot = await get(child(dbRef, '/comments'))
    const fitlered = []
    if (snapshot.val() === null) {
        return []
    } else {
        const comments = snapshot.val()
        Object.values(comments).filter(x => x.bookId === bookId).map(x => {
            fitlered.push(x)
            return x
        })
        return fitlered
    }
}

export async function createComment({ content }, bookId) {
    const comment = {}
    comment.content = content
    comment.bookId = bookId
    comment.creator = localStorage.getItem('username')
    comment._id = uniqid()
    await push(child(dbRef, '/comments'), comment)
    return await getCommentsByBook(bookId)
}

export async function editComment(newComment, id) {
    const commentsSnapshot = await get(child(dbRef, '/comments'))
    const comments = commentsSnapshot.val()
    for (const commentKey in comments) {
        const comment = comments[commentKey]
        if (comment._id === id) {
            comment.content = newComment.content
            await set(child(dbRef, '/comments/' + commentKey), comment)
        }
    }
}

export async function removeComment(id) {
    const commentsSnapshot = await get(child(dbRef, '/comments'))
    const comments = commentsSnapshot.val()
    for (const commentKey in comments) {
        const comment = comments[commentKey]
        if (comment._id === id) {
            await remove(child(dbRef, '/comments/' + commentKey))
        }
    }
}

export async function removeAllCommentsForBook(bookId) {
    const snapshot = await get(child(dbRef, '/comments'))
    if (snapshot.val() === null) {
        return
    } else {
        const comments = snapshot.val()
        for (const commentId in comments) {
            const comment = comments[commentId]
            if (comment.bookId === bookId) {
                await remove(child(dbRef, '/comments/' + commentId))
            }
        }
    }
}