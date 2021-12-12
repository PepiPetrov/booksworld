import { useState, useEffect } from "react"

import usePaginate from '../../../../hooks/usePaginate'
import Pagination from '../../utils/Pagination/Pagination'
import BookItem from "../../utils/BookItem"
import { getUserFavourites } from "../../../../services/profile-service"
import { getBook } from "../../../../services/books-service"
import { isAuth } from '../../../../hoc/isAuth'
import splitArray from '../../../util/splitArray'

function FavouriteBooks() {
    const [favourites, setFavourites] = useState([])
    const [books, setBooks] = useState([])
    const [isFetch, setIsFetch] = useState(true)
    const { data, totalCount, pageSize, currentPage, handlePageChange } = usePaginate(books)

    useEffect(() => {
        if (isFetch) {
            getUserFavourites().then(x => {
                setFavourites(x)
            })
            favourites.map(id => {
                getBook(id).then(x => {
                    setBooks([...books, x])
                })
                return null
            })
        }

        return () => {
            setIsFetch(false)
        }
    })

    const splittedData = splitArray(data, 3)

    return favourites && favourites.length > 0
        ? <>
            <h1>Favoruite books</h1>
            {splittedData.map(x => {
                return <div style={{ display: "flex", marginRight: "3%" }} key={x}>
                    {x.map(book => {
                        return <BookItem book={book} key={book._id} id={book._id}></BookItem>
                    })
                    }
                </div>
            })}
            <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange} />
            page {currentPage} of {Math.ceil(totalCount / pageSize)}
        </>
        : <p>No favourite books</p>
}

export default isAuth(FavouriteBooks)