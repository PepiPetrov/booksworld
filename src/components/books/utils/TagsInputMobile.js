import { useState, useContext } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReactTagInput from "@pathofdev/react-tag-input";
import { isEmpty } from "../../../validators";
import TagsContext from "../../../contexts/TagsContext";

function TagsInputMobile({ tagsInput }) {
    const { setTags: setTagsContext } = useContext(TagsContext)
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

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
        setTagsContext([...tagsInput, form.genre])
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
    }

    const findFormErrors = () => {
        const { genre } = form
        const newErrors = {}
        if (genre !== undefined) {
            if (isEmpty(genre)) {
                newErrors.genre = 'Genre is required!'
            }
        } else {
            newErrors.title = 'Genre is required!'
        }

        return newErrors
    }

    return <Form onSubmit={handleSubmit}>
        <ReactTagInput
            tags={tagsInput}
            onChange={setTagsContext}
            readOnly={false}
            placeholder="Genres will vizualize here"
        />
        <Form.Control
            placeholder="Enter genre" style={{ marginTop: "5%" }}
            onChange={e => setField('genre', e.target.value)}
            isInvalid={!!errors.genre}></Form.Control>
        <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
        <Button type="submit" style={{ marginTop: "5%" }}>Add genre</Button>
    </Form>
}

export default TagsInputMobile
