import { useState, useEffect } from "react"
import BookItem from "../utils/BookItem"
import Pagination from "../utils/Pagination/Pagination"
import usePaginate from '../../../hooks/usePaginate'
import { getRecommendedBooks } from "../../../services/profile-service"
import { isAuth } from '../../../hoc/isAuth'
import splitArray from "../../util/splitArray"

function RecommendedBooks() {
    const [isLoading, setIsLoading] = useState(true)
    const [books, setBooks] = useState([])
    const { data, totalCount, pageSize, currentPage, handlePageChange } = usePaginate(books)

    useEffect(() => {
        if (isLoading) {
            getRecommendedBooks().then(x => {
                setBooks(x || [])
            })
        }

        return () => {
            setIsLoading(false)
        }
    }, [isLoading])

    const splittedData = splitArray(data, 3)

    return books && books.length > 0
        ? <>
            <h1>Recommended books</h1>
            {splittedData.map(x => {
                return <div style={{ display: "flex", marginRight: "3%" }}>
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


export default isAuth(RecommendedBooks)