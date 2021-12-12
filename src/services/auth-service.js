import { getDatabase, ref, child, get, push, query, orderByChild } from "firebase/database"
import uniqid from 'uniqid'
import app from './firebase'

const db = getDatabase(app)
const dbRef = ref(db)

export async function register(user) {
    delete user['confirmPassword']
    const res = await get(child(dbRef, `users/`))
    if (Object.values(user).includes('')) {
        throw new Error('User info field is empty!')
    }
    if (res.val() !== null) {
        const vals = Object.values(res.val())

        for (let user of vals) {
            delete user._id
        }

        for (let userCheck of vals) {
            if (user.username === userCheck.username) {
                throw new Error('Username already exists!')
            }
            if (user.email === userCheck.email) {
                throw new Error('Email already exists!')
            }
        }
    }

    user._id = uniqid()

    await push(ref(getDatabase(app), 'users/'), user)

    return user
}

export async function login(user) {
    let canReturn = false
    let returnUser
    const res = await get(query(child(dbRef, 'users/'), orderByChild('/email')))

    for (let userCheck of Object.values(res.val())) {
        if (user.emailOrUsername === userCheck.email) {
            if (user.password === userCheck.password) {
                canReturn = true
                returnUser = userCheck
                break
            }
        } else if (user.emailOrUsername === userCheck.username) {
            if (user.password === userCheck.password) {
                canReturn = true
                returnUser = userCheck
                break
            }
        }
    }

    if (canReturn === true) {
        return returnUser
    } else {
        throw new Error('User not found!')
    }
}