import { getStorage, ref, uploadBytes, getDownloadURL, list, deleteObject } from 'firebase/storage'
import app from './firebase'

const storage = getStorage(app)

export async function uploadImage(bookId, file) {
    const imageRef = ref(storage, `${bookId}/${file.name}`)
    await uploadBytes(imageRef, file)
}

export async function getImageUrl(bookId) {
    const imageRef = ref(storage, `${bookId}/`)
    const imgList = await list(imageRef)
    const fullRef = imgList.items[0]
    const url = await getDownloadURL(fullRef)
    return url
}

export async function removeImage(bookId) {
    const imageRef = ref(storage, `${bookId}/`)
    const imgList = await list(imageRef)
    const fullRef = imgList.items[0]

    await deleteObject(fullRef)
}

export async function editImage(bookId, file) {
    await removeImage(bookId)
    await uploadImage(bookId, file)
}

export async function getAvatar(username) {
    const imageRef = ref(storage, `${username}/`)
    const imgList = await list(imageRef)
    const fullRef = imgList.items[0]
    if (fullRef) {
        const url = await getDownloadURL(fullRef)
        return url
    } else {
        return ''
    }
}

export async function setAvatar(username, avatar) {
    if (avatar !== null) {
        const imageRef = ref(storage, `${username}/`)
        const avatarRef = ref(storage, `${username}/${avatar.name}`)
        const imgList = await list(imageRef)
        const fullRef = imgList.items[0]
        try {
            await deleteObject(fullRef)
        } catch (e) { }
        await uploadBytes(avatarRef, avatar)
    }
}