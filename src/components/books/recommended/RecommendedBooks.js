import { useState, useEffect } from "react"

import BooksList from '../utils/BooksList/BooksList'
import { getRecommendedBooks } from "../../../services/profile-service"
import { isAuth } from '../../../hoc/isAuth'

function RecommendedBooks() {
    const [isLoading, setIsLoading] = useState(true)
    const [books, setBooks] = useState([])

    useEffect(() => {
        if (isLoading) {
            getRecommendedBooks().then(x => {
                setBooks(x || [])
            })
        }

        return () => {
            setIsLoading(false)
        }
    }, [isLoading])

    return books && books.length > 0
        ? <>
            <h1>Recommended books</h1>
            <BooksList books={books} />

        </>
        : <p>No books</p>
}


export default isAuth(RecommendedBooks)