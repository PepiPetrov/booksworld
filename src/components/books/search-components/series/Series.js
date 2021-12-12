import { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import usePaginate from '../../../../hooks/usePaginate'
import BookItem from '../../utils/BookItem'
import Pagination from "../../utils/Pagination/Pagination"
import { searchBySeries } from '../../../../services/search-service'

export default function SearchBySeries() {
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [books, setBooks] = useState([])
    const [isResult, setIsResult] = useState(false)
    const [shouldShow, setShouldShow] = useState(false)
    const { data, totalCount, pageSize, currentPage, handlePageChange } = usePaginate(books)

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        searchBySeries(form.keyword).then(x => {
            setBooks(x)
            if (books.length > 0) {
                setIsResult(true)
            } else {
                setIsResult(false)
            }
            setShouldShow(true)
        })

    }

    const findFormErrors = () => {
        const { keyword } = form
        const newErrors = {}

        if (keyword === undefined || keyword === '') {
            newErrors.keyword = 'Keyword is required!'
        }

        return newErrors
    }

    return <div>
        <h1 className="my-4 font-weight-bold .display-4">Search by series</h1>
        <Form onSubmit={handleSubmit} style={{ width: "50%", marginLeft: "27%" }}>
            <Form.Group>
                <Form.Control onChange={e => setField('keyword', e.target.value)}
                    placeholder="Keyword" isInvalid={!!errors.keyword} />
                <Form.Control.Feedback type="invalid">{errors.keyword}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" style={{ marginTop: "2%" }}>Search</Button>
        </Form>
        {shouldShow ?
            isResult
                ? <>
                    {data.map(book => <BookItem book={book} key={book._id} id={book._id}></BookItem>)}
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange} />
                    page {currentPage} of {Math.ceil(totalCount / pageSize)}
                </>
                : <p>No results</p>
            : null
        }
    </div >

}