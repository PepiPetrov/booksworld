import { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import BooksList from '../../utils/BooksList/BooksList'
import { searchBySeries } from '../../../../services/search-service'

export default function SearchBySeries() {
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [books, setBooks] = useState([])
    const [isResult, setIsResult] = useState(false)
    const [shouldShow, setShouldShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)
        searchBySeries(form.keyword).then(x => {
            setBooks(x)
            if (x.length > 0) {
                setIsResult(true)
            }
            setShouldShow(true)
            setIsLoading(false)
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
        <Form onSubmit={handleSubmit} style={{ width: "50%", marginLeft: "27%" }} data-testid="form">
            <Form.Group>
                <Form.Control onChange={e => setField('keyword', e.target.value)}
                    placeholder="Keyword" isInvalid={!!errors.keyword} role="input" />
                <Form.Control.Feedback type="invalid" role="invalid-input">{errors.keyword}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" style={{ marginTop: "10%" }}>Search</Button>
        </Form>
        {shouldShow ?
            isResult
                ? <BooksList books={books} />
                : <p style={{ marginTop: "3%" }}>No results</p>
            : isLoading
                ? <p>Loading results...</p>
                : null
        }
    </div >

}