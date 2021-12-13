import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getBySeries } from '../../../services/books-service'
import BooksList from '../utils/BooksList/BooksList'

export default function Series() {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { name } = useParams()
    useEffect(() => {
        if (isLoading) {
            getBySeries(name).then(x => {
                setBooks(x)
            })
        }

        return () => {
            setIsLoading(false)
        }

    })
    return !isLoading
        ? books && books.length > 0
            ? <BooksList books={books} />
            : <p>No books from this series</p>
        : <p>Loading books...</p>
}