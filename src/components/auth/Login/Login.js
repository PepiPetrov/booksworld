import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { login as authSliceLogin } from '../../../redux/slices/authSlice'

import { login } from '../../../services/auth-service'
import { isGuest } from '../../../hoc/isGuest'

function Signin() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [doShowPassword, setDoShowPassword] = useState(false)

    const checkboxChange = () => {
        setDoShowPassword(!doShowPassword)
    }

    if (user.token !== null) {
        navigate('/')
        return null
    }

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

    const handleSubmit = e => {
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        } else {
            login(form).then(x => {
                localStorage.setItem('token', x._id)
                localStorage.setItem('username', x.username)
                dispatch(authSliceLogin())
                navigate('/')
            }).catch(e => {
                alert(e.message)
            })
        }
    }

    const findFormErrors = () => {
        const { emailOrUsername, password } = form
        const newErrors = {}

        if (emailOrUsername && emailOrUsername.length === 0) {
            newErrors.emailOrUsername = 'Email or username is required!'
        }
        if (password && password.length === 0) {
            newErrors.password = 'Password is required!'
        }

        return newErrors
    }

    return (
        <div>
            <h1 className="my-4 font-weight-bold .display-4">Sign In</h1>
            <Form style={{ width: '300px' }} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email or username</Form.Label>
                    <Form.Control type="text" onChange={e => setField('emailOrUsername', e.target.value)} isInvalid={!!errors.emailOrUsername} placeholder="Email or username" />
                    <Form.Control.Feedback type='invalid'>
                        {errors.emailOrUsername}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={doShowPassword ? 'text' : 'password'} autoComplete="your-pass" onChange={e => setField('password', e.target.value)} isInvalid={!!errors.password} placeholder="Password" />
                    <Form.Check label="Show password" onChange={checkboxChange}></Form.Check>
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default isGuest(Signin)