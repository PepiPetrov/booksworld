import { getAll } from './books-service'

export async function searchByTitle(string) {
    const books = await getAll()
    const results = []
    if (books !== null) {
        for (const book of books) {
            if (book.title.toLowerCase().includes(string.toLowerCase())) {
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
            if (book.author.toLowerCase().includes(string.toLowerCase())) {
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
            const genres = book.genres.map(x => x.toLowerCase())
            if (genres.filter(x => x.includes(string.toLowerCase())).length > 0) {
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
            if (book.series && book.series.toLowerCase().includes(string.toLowerCase())) {
                results.push(book)
            }
        }
        results.sort((a, b) => a.seriesRow - b.seriesRow)
    }
    return results
}