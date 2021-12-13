import { useEffect, useState } from "react"

import BooksList from '../../utils/BooksList/BooksList'
import { getAll } from '../../../../services/books-service'

export default function AllBooks() {
    const [all, setAll] = useState([])
    const [isFetch, setIsFetch] = useState(true)

    useEffect(() => {
        if (isFetch) {
            getAll().then(x => {
                setAll(x)
            })
        }
        return () => {
            setIsFetch(false)
        }
    })

    return all && all.length > 0
        ? <>
            <h1>All books</h1>
            <BooksList books={all}></BooksList>
        </>
        : <p>No books</p>
}