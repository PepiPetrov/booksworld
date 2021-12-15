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

    return !isFetch
        ? mostLiked && mostLiked.length > 0
            ? <>
                <h1 style={{ marginTop:"3%" }}>Most liked books</h1>
                <BooksList books={mostLiked} />
            </>
            : <p>No books</p>
        : <p>Loading books...</p>
}