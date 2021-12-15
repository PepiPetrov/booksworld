import { useEffect, useState } from "react"

import BooksList from "../../utils/BooksList/BooksList"
import { getLikedBooks } from '../../../../services/profile-service'
import { isAuth } from '../../../../hoc/isAuth'

function LikedBooks() {
    const [liked, setLiked] = useState([])
    const [isFetch, setIsFetch] = useState(true)

    useEffect(() => {
        if (isFetch) {
            getLikedBooks().then(x => {
                setLiked(x)
            })
        }
        return () => {
            setIsFetch(false)
        }
    })

    return !isFetch
        ? liked && liked.length > 0
            ? <>
                <h1 style={{ marginTop:"0.5%" }}>Liked books</h1>
                <BooksList books={liked} />
            </>
            : <p>No liked books</p>
        : <p>Loading books...</p>
}

export default isAuth(LikedBooks)