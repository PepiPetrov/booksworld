import { useEffect, useState } from "react"

import usePaginate from "../../../../hooks/usePaginate"
import Pagination from "../../utils/Pagination/Pagination"
import BookItem from "../../utils/BookItem"
import { getMostLikedBooks } from '../../../../services/books-service'
import splitArray from "../../../util/splitArray"

export default function MostLikedBooks() {
    const [mostLiked, setMostLiked] = useState([])
    const [isFetch, setIsFetch] = useState(true)

    const { data, totalCount, pageSize, currentPage, handlePageChange } = usePaginate(mostLiked ? mostLiked : [])
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

    const splittedData = splitArray(data, 3)

    return mostLiked && mostLiked.length > 0
        ? <>
            <h1>Most liked books</h1>
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
        : <p>No books</p>
}