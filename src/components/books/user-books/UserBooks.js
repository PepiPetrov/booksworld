import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import BooksList from '../utils/BooksList/BooksList'
import { getBooksByUser } from '../../../services/books-service'


export default function UserBooks() {
    const { username } = useParams()
    const [all, setAll] = useState([])
    const [isFetch, setIsFetch] = useState(true)

    useEffect(() => {
        if (isFetch) {
            getBooksByUser(username).then(x => {
                setAll(x)
            })
        }
        return () => {
            setIsFetch(false)
        }
    })

    return !isFetch
        ? all && all.length > 0
            ? <>
                <h1>{username}'s books</h1>
                <BooksList books={all} />

            </>
            : <p>No books</p>
        : <p>Loading books</p>
}