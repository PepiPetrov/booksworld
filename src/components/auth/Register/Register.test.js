import { fireEvent, render } from '@testing-library/react'
import * as redux from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from '../../../redux/store'
import Signin from './Login'

describe('login', () => {

    test('field 1 is working', () => {
        const component = render(<redux.Provider store={store}>
            <Routes>
                <Route path="/" element={<Signin />}></Route>
                <Route path="/login" element={<Signin />}></Route>
            </Routes>
        </redux.Provider>, { wrapper: BrowserRouter })

        const field = component.getByTestId('input-1')
        fireEvent.change(field, { target: { value: '' } })
        expect(component.findByTestId('invalid-1')).toBeTruthy()
    })

    test('field 1 is working', () => {
        const component = render(<redux.Provider store={store}>
            <Routes>
                <Route path="/" element={<Signin />}></Route>
                <Route path="/login" element={<Signin />}></Route>
            </Routes>
        </redux.Provider>, { wrapper: BrowserRouter })

        const field = component.getByTestId('input-2')
        fireEvent.change(field, { target: { value: '' } })
        expect(component.findByTestId('invalid-2')).toBeTruthy()
    })

})
