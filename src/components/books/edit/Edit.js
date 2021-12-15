import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import ReactTagInput from '@pathofdev/react-tag-input'
import TagsInputMobile from '../utils/TagsInputMobile'
import TagsContext from '../../../contexts/TagsContext'
import useIsMobile from '../../../hooks/useIsMobile'
import { isEmpty } from '../../../validators'
import { edit, getBook } from '../../../services/books-service'
import { isAuth } from '../../../hoc/isAuth'
import { isOwner } from '../../../hoc/isOwner'

function Edit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isMobile = useIsMobile()
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [tags, setTags] = useState([])
    const [file, setFile] = useState(null)

    useEffect(() => {
        getBook(id).then(x => {
            setTags(x.genres)
            setForm(x)
        })
        return
    }, [id, navigate])

    form.genres = tags

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
        form.genres = tags
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        edit(id, form, file).then(x => {
            navigate(`/details/${form._id}`)
        })
    }

    const findFormErrors = () => {
        // eslint-disable-next-line
        const { title, author, description, series, seriesRow, publisher, year } = form
        const newErrors = {}
        if (title === undefined || title.length === 0) {
            newErrors.title = 'Title is required!'
        }
        if (author === undefined || author.length === 0) {
            newErrors.author = 'Author is required!'
        }

        if (description === undefined || description.length === 0) {
            newErrors.description = 'Description is required!'
        }

        if (year !== undefined) {
            if (year < 1950) {
                newErrors.year = 'Minimal value is 1950!'
            }
        } else {
            newErrors.year = 'Year is required!'
        }

        if (publisher !== undefined) {
            if (isEmpty(publisher)) {
                newErrors.publisher = 'Publisher is required!'
            }
        } else {
            newErrors.publisher = 'Publisher is required!'
        }

        if (tags.length === 0) {
            newErrors.genre = 'There must be at least one genre!'
        }

        return newErrors
    }

    return (
        <TagsContext.Provider value={{ setTags }}>
            <div>
                <h1 className="my-4 font-weight-bold .display-4">Edit Book</h1>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={e => setField('title', e.target.value)} placeholder="Title" isInvalid={!!errors.title} value={form.title} />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Author</Form.Label>
                            <Form.Control onChange={e => setField('author', e.target.value)} placeholder="Author" isInvalid={!!errors.author} value={form.author} />
                            <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Form.Group style={{ marginTop: "5%" }}>
                        <Form.Label>Image (optional, original image won't be replaced)</Form.Label>
                        <Form.Control type="file" onChange={e => setFile(e.target.files[0])}></Form.Control>
                    </Form.Group>
                    <Form.Group style={{ marginTop: "5%" }}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" onChange={e => setField('description', e.target.value)} isInvalid={!!errors.description} value={form.description} />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
                <div style={{ marginTop: "5%", width: "50%", marginLeft: "25%" }}>
                    <Form.Label>Genres</Form.Label>
                    {!isMobile
                        ? <ReactTagInput
                            tags={tags}
                            onChange={tags => setTags(tags)}
                            placeholder="Enter genre and press enter"
                        />
                        : null
                    }
                    {isMobile
                        ? <TagsInputMobile tagsInput={tags} onChange={setTags}></TagsInputMobile>
                        : null}
                    <Form.Control.Feedback type="invalid">{errors.genres}</Form.Control.Feedback>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row style={{ marginTop: "5%" }}>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Series</Form.Label>
                            <Form.Control onChange={e => setField('series', e.target.value)} placeholder="Series" value={form.series}></Form.Control>
                        </Form.Group>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Series Number</Form.Label>
                            <Form.Control onChange={e => setField('seriesRow', e.target.value)} placeholder="Series Number" type="number" value={form.seriesRow} />
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: "5%" }}>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Year of Publishing*</Form.Label>
                            <Form.Control onChange={e => setField('year', e.target.value)} placeholder="Year of Publishing" isInvalid={!!errors.year} type="number" min="1950" value={form.year} />
                            <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Publisher*</Form.Label>
                            <Form.Control onChange={e => setField('publisher', e.target.value)} placeholder="Publisher" isInvalid={!!errors.publisher} value={form.publisher} />
                            <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: "5%" }}>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>You can read the book online here: </Form.Label>
                            <Form.Control onChange={e => setField('onlineLink', e.target.value)} placeholder="Link to read online" defaultValue={form.onlineLink || ''}></Form.Control>
                        </Form.Group>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>You can download the book here: </Form.Label>
                            <Form.Control onChange={e => setField('downloadLink', e.target.value)} placeholder="Link to download" defaultValue={form.downloadLink || ''}></Form.Control>
                        </Form.Group>
                    </Row>
                    <Form.Group style={{ marginTop: "5%" }}>
                        <Form.Label>You can buy the book here: </Form.Label>
                        <Form.Control onChange={e => setField('buyLink', e.target.value)} placeholder="Link to buy" defaultValue={form.buyLink || ''}></Form.Control>
                    </Form.Group>
                    <Button type="submit" style={{ marginTop: "3%", marginBottom: "3%" }} variant="success">Edit Book</Button>
                </Form>
            </div >
        </TagsContext.Provider >
    )
}

export default isAuth(isOwner(Edit))