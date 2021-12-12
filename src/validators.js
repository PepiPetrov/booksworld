export function isEmpty(string) {
    if (string.length === 0 || string === undefined) {
        return true
    }
    return false
}

export function equals(a, b) {
    if (a === b) {
        return true
    }
    return false
}

export function isLength(string, length) {
    if (string.length >= length) {
        return true
    }
    return false
}

export function isURL(url) {
    const regex = /^(https:|http:|www\.)\S*/gm
    return regex.test(url)
}

export function isEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return regex.test(email)
}