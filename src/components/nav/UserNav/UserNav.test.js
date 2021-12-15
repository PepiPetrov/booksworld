import { render } from '@testing-library/react'
import * as redux from 'react-redux'
import UserNav from './UserNav'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import store from '../../../redux/store'

describe('Home page', () => {
    jest.setTimeout(6000)

    test('main link is there', async () => {

        jest.mock('react-redux', () => {
            return { useDispatch: () => { } }
        })

        const home = render(<redux.Provider store={store}>
            <Routes>
                <Route path="/" element={<UserNav></UserNav>}></Route>
            </Routes>
        </redux.Provider>, { wrapper: BrowserRouter })

        expect(home.getAllByTestId('main')).toBeTruthy()
    })
})