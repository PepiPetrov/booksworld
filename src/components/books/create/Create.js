import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReactTagInput from '@pathofdev/react-tag-input'
import TagsInputMobile from '../utils/TagsInputMobile'
import TagsContext from '../../../contexts/TagsContext'
import useIsMobile from '../../../hooks/useIsMobile'
import { isEmpty } from '../../../validators'
import { create } from '../../../services/books-service'
import { isAuth } from '../../../hoc/isAuth'

function Create() {
    const navigate = useNavigate()
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [tags, setTags] = useState([])
    const [file, setFile] = useState(null)
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
        create(form, file).then(() => {
            navigate(`/details/${form._id}`)
        })
    }

    const findFormErrors = () => {
        // eslint-disable-next-line
        const { title, author, description, series, seriesRow, year } = form
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

        if (tags.length === 0) {
            newErrors.genre = 'There must be at least one genre!'
        }

        return newErrors
    }

    return (
        <TagsContext.Provider value={{ setTags }}>
            <div>
                <h1 className="my-4 font-weight-bold .display-4">Create Book</h1>
                <Form style={{ width: '300px' }}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={e => setField('title', e.target.value)} placeholder="Title" isInvalid={!!errors.title} defaultValue={String('')} />
                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control onChange={e => setField('author', e.target.value)} placeholder="Author" isInvalid={!!errors.author} />
                        <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={e => setFile(e.target.files[0])} placeholder="Choose image"></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.img}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" onChange={e => setField('description', e.target.value)} isInvalid={!!errors.description} />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
                <div style={{ width: "300px" }}>
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
                        ? <TagsInputMobile tagsInput={tags}></TagsInputMobile>
                        : null}
                    <Form.Control.Feedback type="invalid">{errors.genres}</Form.Control.Feedback>
                </div>
                <Form style={{ width: '300px' }} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Series</Form.Label>
                        <Form.Control onChange={e => setField('series', e.target.value)} placeholder="Series - optional"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Series Number</Form.Label>
                        <Form.Control onChange={e => setField('seriesRow', e.target.value)} placeholder="Series Number - optional" type="number" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Year of Publishing</Form.Label>
                        <Form.Control onChange={e => setField('year', e.target.value)} placeholder="Year of Publishing" isInvalid={!!errors.year} type="number" min="1950" />
                        <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Link to buy from</Form.Label>
                        <Form.Control onChange={e => setField('buyLink', e.target.value)} placeholder="Link to buy from - optional"></Form.Control>
                    </Form.Group>
                    <Button type="submit" style={{ marginTop: "5%" }}>Create Book</Button>
                </Form>
            </div >
        </TagsContext.Provider>
    )
}

export default isAuth(Create)