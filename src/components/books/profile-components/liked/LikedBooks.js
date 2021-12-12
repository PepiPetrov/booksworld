import { useEffect, useState } from "react"
import usePaginate from '../../../../hooks/usePaginate'
import BookItem from "../../utils/BookItem"
import Pagination from '../../utils/Pagination/Pagination'
import { getLikedBooks } from '../../../../services/profile-service'
import { isAuth } from '../../../../hoc/isAuth'
import splitArray from '../../../util/splitArray'

function LikedBooks() {
    const [liked, setLiked] = useState([])
    const [isFetch, setIsFetch] = useState(true)
    const { data, totalCount, pageSize, currentPage, handlePageChange } = usePaginate(liked)

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

    const splittedData = splitArray(data, 3)

    return liked && liked.length > 0
        ? <>
            <h1>Liked books</h1>
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
        : <p>No liked books</p>
}

export default isAuth(LikedBooks)