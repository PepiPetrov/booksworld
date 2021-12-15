import { fireEvent, render } from '@testing-library/react'
import * as redux from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from '../../../redux/store'
import Signup from './Register'

describe('register', () => {

    jest.setTimeout(6000)

    test('field 1 is working', () => {
        const component = render(<redux.Provider store={store}>
            <Routes>
                <Route path="/" element={<Signup />}></Route>
                <Route path="/login" element={<Signup />}></Route>
            </Routes>
        </redux.Provider>, { wrapper: BrowserRouter })

        const field = component.getByTestId('input-1')

        fireEvent.change(field, { target: { value: '' } })

        const invalid = component.getByTestId('invalid-1')

        expect(invalid).toBeTruthy()
        expect(invalid.textContent).toBe('')
    })

    test('field 2 is working', () => {
        const component = render(<redux.Provider store={store}>
            <Routes>
                <Route path="/" element={<Signup />}></Route>
                <Route path="/login" element={<Signup />}></Route>
            </Routes>
        </redux.Provider>, { wrapper: BrowserRouter })

        const field = component.getByTestId('input-2')
        fireEvent.change(field, { target: { value: '' } })
        expect(component.findByTestId('invalid-2')).toBeTruthy()
    })

    test('field 3 is working', () => {
        const component = render(<redux.Provider store={store}>
            <Routes>
                <Route path="/" element={<Signup />}></Route>
                <Route path="/login" element={<Signup />}></Route>
            </Routes>
        </redux.Provider>, { wrapper: BrowserRouter })

        const field = component.getByTestId('input-3')
        fireEvent.change(field, { target: { value: '' } })
        expect(component.findByTestId('invalid-3')).toBeTruthy()
    })

    test('field 3 checkbox is working', () => {
        const component = render(<redux.Provider store={store}>
            <Routes>
                <Route path="/" element={<Signup />}></Route>
                <Route path="/login" element={<Signup />}></Route>
            </Routes>
        </redux.Provider>, { wrapper: BrowserRouter })

        const field = component.getByRole('input')
        const checkBox = component.getByTestId('checkbox-1')
        let fieldType = field.type

        expect(fieldType).toBe('password')
        fireEvent.click(checkBox)

        fieldType = field.type
        expect(fieldType).toBe('text')
    })

    test('field 4 is working', () => {
        const component = render(<redux.Provider store={store}>
            <Routes>
                <Route path="/" element={<Signup />}></Route>
                <Route path="/login" element={<Signup />}></Route>
            </Routes>
        </redux.Provider>, { wrapper: BrowserRouter })

        const form = component.getByRole('form')

        const pass = component.getByTestId('input-3')

        const confirmPass = component.getByRole('confirm-pass')


        fireEvent.change(pass, { target: { value: 'asdasd' } })
        fireEvent.change(confirmPass, { target: { value: 'asdasd' } })
        let invalidConfirm = component.getByRole('invalid-confirm')

        expect(invalidConfirm.textContent).toBeFalsy()

        fireEvent.change(pass, { target: { value: 'asdasd' } })
        fireEvent.change(confirmPass, { target: { value: 'a' } })
        fireEvent.submit(form)

        invalidConfirm = component.getByRole('invalid-confirm')
        expect(invalidConfirm.textContent).toBe('Passwords do not match!')

    })

})
