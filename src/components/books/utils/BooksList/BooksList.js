import usePaginate from "../../../../hooks/usePaginate"
import Pagination from "../Pagination/Pagination"
import BookItem from "./BookItem/BookItem"
import splitArray from "../../../util/splitArray"
import styles from './BooksList.module.css'


export default function BooksList({ books }) {
    const { data, totalCount, pageSize, currentPage, handlePageChange } = usePaginate(books ? books : [])
    const splittedData = splitArray(data, 3)

    return <>
        {splittedData.map(x => {
            return <div className={styles['books-row']} data-testid="booksrow" key={x[0]._id}>
                {x.map(book => {
                    return <BookItem book={book} key={book._id} />
                })
                }
            </div>
        })}
        <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange} />
    </>
}