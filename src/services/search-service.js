import { getAll } from './books-service'

export async function searchByTitle(string) {
    const books = await getAll()
    const results = []
    if (books !== null) {
        for (const book of books) {
            if (book.title.includes(string)) {
                results.push(book)
            }
        }
        results.sort((a, b) => a.title.localeCompare(b.title))
    }
    return results
}

export async function searchByAuthor(string) {
    const books = await getAll()
    const results = []
    if (books !== null) {
        for (const book of books) {
            if (book.author.includes(string)) {
                results.push(book)
            }
        }
        results.sort((a, b) => a.title.localeCompare(b.title))
    }
    return results
}

export async function searchByGenre(string) {
    const books = await getAll()
    const results = []
    if (books !== null) {
        for (const book of books) {
            if (book.genres.includes(string)) {
                results.push(book)
            }
        }
        results.sort((a, b) => a.title.localeCompare(b.title))
    }
    return results
}

export async function searchBySeries(string) {
    const books = await getAll()
    const results = []
    if (books !== null) {
        for (const book of books) {
            if (book.series.includes(string)) {
                results.push(book)
            }
        }
        results.sort((a, b) => a.seriesRow - b.seriesRow)
    }
    return results
}