import { useEffect, useState } from "react"

import BooksList from "../../utils/BooksList/BooksList"
import { getMostLikedBooks } from '../../../../services/books-service'

export default function MostLikedBooks() {
    const [mostLiked, setMostLiked] = useState([])
    const [isFetch, setIsFetch] = useState(true)

    useEffect(() => {
        if (isFetch) {
            getMostLikedBooks().then(x => {
                setMostLiked(x)
            })
        }
        return () => {
            setIsFetch(false)
        }
    })

    return mostLiked && mostLiked.length > 0
        ? <>
            <h1>Most liked books</h1>
            <BooksList books={mostLiked} />
        </>
        : <p>No books</p>
}