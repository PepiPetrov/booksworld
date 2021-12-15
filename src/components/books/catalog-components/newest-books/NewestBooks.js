import { useEffect, useState } from "react"

import BooksList from '../../utils/BooksList/BooksList'
import { getNewestBooks } from '../../../../services/books-service'

export default function NewestBooks() {
    const [newest, setNewest] = useState([])
    const [isFetch, setIsFetch] = useState(true)

    useEffect(() => {
        if (isFetch) {
            getNewestBooks().then(x => {
                setNewest(x)
            })
        }
        return () => {
            setIsFetch(false)
        }
    })

    return !isFetch
        ? newest && newest.length > 0
            ? <>
                <h1 style={{ marginTop: "3%" }}>Newest books</h1>
                <BooksList books={newest} />

            </>
            : <p>No books</p>
        : <p>Loading books...</p>
}