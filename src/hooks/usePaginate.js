import { useState } from "react"
import { paginate } from "../components/books/utils/Pagination/paginate"

export default function usePaginate(books) {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 9

    const handlePageChange = page => {
        setCurrentPage(page)
    }

    const getPageData = () => {

        const paginationData = paginate(books, currentPage, pageSize)
        return { totalCount: books.length, data: paginationData }
    }

    const { totalCount, data } = getPageData()
    return { data, totalCount, pageSize, currentPage, handlePageChange }

}