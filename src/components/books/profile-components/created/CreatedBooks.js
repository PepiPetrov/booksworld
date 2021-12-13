import { useEffect, useState } from "react"

import { getCreatedBooks } from '../../../../services/profile-service'
import { isAuth } from '../../../../hoc/isAuth'
import BooksList from '../../utils/BooksList/BooksList'

function CreatedBooks() {
    const [created, setCreated] = useState([])
    const [isFetch, setIsFetch] = useState(true)

    useEffect(() => {
        if (isFetch) {
            getCreatedBooks().then(x => {
                setCreated(x)
            })
        }
        return () => {
            setIsFetch(false)
        }
    })

    return created && created.length > 0
        ? <>
            <h1>My books</h1>
            <BooksList books={created} />
        </>
        : <p>No created books</p>
}

export default isAuth(CreatedBooks)