import { useEffect, useState } from "react"
import { paginate } from "../components/books/utils/Pagination/paginate"

export default function usePaginate(books) {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 9

    useEffect(() => {
        if (window.location.search) {
            const page = Number(window.location.search.split('page=')[1])
            setCurrentPage(page)
        }
    }, [setCurrentPage])

    const handlePageChange = page => {
        setCurrentPage(page)
        window.location.search = 'page=' + page
    }

    const getPageData = () => {

        const paginationData = paginate(books, currentPage, pageSize)
        return { totalCount: books.length, data: paginationData }
    }

    const { totalCount, data } = getPageData()
    return { data, totalCount, pageSize, currentPage, handlePageChange }

}