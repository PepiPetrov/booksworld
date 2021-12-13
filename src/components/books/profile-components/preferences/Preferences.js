import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReactTagInput from "@pathofdev/react-tag-input"
import { setUserPreferences, getUserPreferences } from '../../../../services/profile-service'
import { isAuth } from '../../../../hoc/isAuth'

function Preferences() {
    const navigate = useNavigate()
    const [genres, setGenres] = useState([])
    const [authors, setAuthors] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoading) {
            getUserPreferences().then(x => {
                setGenres(x.genres || [])
                setAuthors(x.authors || [])
            })
        }

        return () => {
            setIsLoading(false)
        }
    }, [isLoading])

    const handleSubmit = (e) => {
        e.preventDefault()
        setUserPreferences({ authors, genres }).then(() => {
            navigate(`/profile/recommended`)
        })
    }

    return (
        <div>
            <h1 className="my-4 font-weight-bold .display-4">Set Preferences</h1>
            <Form style={{ width: '300px', marginLeft: "20%" }} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Genres</Form.Label>
                    <ReactTagInput
                        tags={genres}
                        onChange={setGenres}
                        placeHolder="Enter genre and press enter"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Authors</Form.Label>
                    <ReactTagInput
                        tags={authors}
                        onChange={setAuthors}
                        placeHolder="Enter author and press enter"
                    />
                </Form.Group>
                <Button type="submit" style={{ marginTop: '5%' }}>Set Preferences</Button>
            </Form>
        </div >
    )
}

export default isAuth(Preferences)