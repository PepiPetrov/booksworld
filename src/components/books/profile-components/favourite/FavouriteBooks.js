import { useState, useEffect } from "react"

import BooksList from '../../utils/BooksList/BooksList'
import { getUserFavourites } from "../../../../services/profile-service"
import { getBook } from "../../../../services/books-service"
import { isAuth } from '../../../../hoc/isAuth'

function FavouriteBooks() {
    const [favourites, setFavourites] = useState([])
    const [books, setBooks] = useState([])
    const [isFetch, setIsFetch] = useState(true)

    useEffect(() => {
        if (isFetch) {
            getUserFavourites().then(x => {
                x.map(id => {
                    getBook(id).then(x => {
                        setBooks([...books, x])
                    })
                    return null
                })
                setFavourites(x)
            })
        }

        return () => {
            setIsFetch(false)
        }
    })

    return !isFetch
        ? favourites && favourites.length > 0
            ? <>
                <h1 style={{ marginTop:"0.5%" }}>Favoruite books</h1>
                <BooksList books={books} />
            </>
            : <p>No favourite books</p>
        : <p>Loading books...</p>
}

export default isAuth(FavouriteBooks)