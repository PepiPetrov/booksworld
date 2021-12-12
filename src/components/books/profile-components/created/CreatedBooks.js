import { useEffect, useState } from "react"

import usePaginate from "../../../../hooks/usePaginate"
import Pagination from "../../utils/Pagination/Pagination"
import BookItem from "../../utils/BookItem"
import { getCreatedBooks } from '../../../../services/profile-service'
import { isAuth } from '../../../../hoc/isAuth'
import splitArray from '../../../util/splitArray'

function CreatedBooks() {
    const [created, setCreated] = useState([])
    const [isFetch, setIsFetch] = useState(true)

    const { data, totalCount, pageSize, currentPage, handlePageChange } = usePaginate(created)
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

    const splittedData = splitArray(data, 3)

    return created && created.length > 0
        ? <>
            <h1>My books</h1>
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
        : <p>No created books</p>
}

export default isAuth(CreatedBooks)