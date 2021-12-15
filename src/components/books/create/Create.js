import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import ReactTagInput from '@pathofdev/react-tag-input'
import TagsInputMobile from '../utils/TagsInputMobile'
import TagsContext from '../../../contexts/TagsContext'
import useIsMobile from '../../../hooks/useIsMobile'
import { isEmpty } from '../../../validators'
import { create, ifExists } from '../../../services/books-service'
import { isAuth } from '../../../hoc/isAuth'

function Create() {
    const [form, setForm] = useState({})
    const [isExisting, setIsExisting] = useState(false)
    const [errors, setErrors] = useState({})
    const [tags, setTags] = useState([])
    const [file, setFile] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const isMobile = useIsMobile()

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
        setIsCreating(true)
        ifExists(form).then(x => {
            if (x) {
                setIsCreating(false)
                setIsExisting(true)
            }
        })

        create(form, file).then(id => {
            if (id === null) {
                return
            } else {
                setIsCreating(false)
                window.location.pathname = "/details/" + form._id
            }
        })
    }

    const findFormErrors = () => {
        // eslint-disable-next-line
        const { title, author, description, series, seriesRow, publisher, year } = form
        const newErrors = {}
        if (title !== undefined) {
            if (isEmpty(title)) {
                newErrors.title = 'Title is required!'
            }
        } else {
            newErrors.title = 'Title is required!'
        }

        if (author !== undefined) {
            if (isEmpty(author)) {
                newErrors.author = 'Author is required!'
            }
        } else {
            newErrors.author = 'Author is required!'
        }

        if (file === null) {
            newErrors.img = 'Image is required!'
        }

        if (description !== undefined) {
            if (isEmpty(description)) {
                newErrors.description = 'Description is required!'
            }
        } else {
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
                <h1 className="my-4 font-weight-bold .display-4">Add Book</h1>
                <Form>
                    <Row>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Title*</Form.Label>
                            <Form.Control onChange={e => setField('title', e.target.value)} placeholder="Title" isInvalid={!!errors.title} defaultValue={String('')} />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Author*</Form.Label>
                            <Form.Control onChange={e => setField('author', e.target.value)} placeholder="Author" isInvalid={!!errors.author} />
                            <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Form.Group style={{ marginTop: "5%", width: "50%", marginLeft: "25%" }}>
                        <Form.Label>Image*</Form.Label>
                        <Form.Control type="file" onChange={e => setFile(e.target.files[0])} isInvalid={!!errors.img}></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.img}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{ marginTop: "5%" }}>
                        <Form.Label>Description*</Form.Label>
                        <Form.Control as="textarea" onChange={e => setField('description', e.target.value)} isInvalid={!!errors.description} />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
                <div style={{ marginTop: "5%", width: "50%", marginLeft: "25%" }}>
                    <Form.Label>Genres*</Form.Label>
                    {!isMobile
                        ? <ReactTagInput
                            tags={tags}
                            onChange={tags => setTags(tags)}
                            placeholder="Enter genre and press enter"
                        />
                        : null
                    }
                    {isMobile
                        ? <TagsInputMobile tagsInput={tags}></TagsInputMobile>
                        : null}
                    {errors.genre
                        ? <div className="invalid-feedback">{errors.genre}</div>
                        : null
                    }
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row style={{ marginTop: "5%" }}>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Series</Form.Label>
                            <Form.Control onChange={e => setField('series', e.target.value)} placeholder="Series - optional"></Form.Control>
                        </Form.Group>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Series Number</Form.Label>
                            <Form.Control onChange={e => setField('seriesRow', e.target.value)} placeholder="Series Number - optional" type="number" />
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: "5%" }}>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Year of Publishing*</Form.Label>
                            <Form.Control onChange={e => setField('year', e.target.value)} placeholder="Year of Publishing" isInvalid={!!errors.year} type="number" min="1950" />
                            <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>Publisher*</Form.Label>
                            <Form.Control onChange={e => setField('publisher', e.target.value)} placeholder="Publisher" isInvalid={!!errors.publisher} />
                            <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: "5%" }}>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>You can read the book online here: </Form.Label>
                            <Form.Control onChange={e => setField('onlineLink', e.target.value)} placeholder="Link to read online"></Form.Control>
                        </Form.Group>
                        <Form.Group style={{ width: "50%", float: "left" }}>
                            <Form.Label>You can download the book here: </Form.Label>
                            <Form.Control onChange={e => setField('downloadLink', e.target.value)} placeholder="Link to download"></Form.Control>
                        </Form.Group>
                    </Row>
                    <Form.Group style={{ marginTop: "5%" }}>
                        <Form.Label>You can buy the book here: </Form.Label>
                        <Form.Control onChange={e => setField('buyLink', e.target.value)} placeholder="Link to buy"></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="success" style={{ marginTop: "5%" }}>Add Book</Button>
                </Form>
            </div >
            <Modal
                show={isCreating}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    Book is being added...
                </Modal.Body>
            </Modal>
            <Modal show={isExisting} onHide={setIsExisting} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Book already exists!</Modal.Body>
            </Modal>
        </TagsContext.Provider >
    )
}

export default isAuth(Create)