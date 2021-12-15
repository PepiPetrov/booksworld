import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import * as redux from 'react-redux'
import Home from './Home'
import store from '../../../redux/store'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

describe('Home page', () => {
    jest.setTimeout(6000)

    test('links are there', async () => {
        const home = render(<Provider store={store}>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
            </Routes>
        </Provider>, { wrapper: BrowserRouter })

        expect(home.getAllByTestId('links')).toBeTruthy()
    })
    
    test('login is correct', () => {
        const spyOnUseSelector = jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({ user: { username: 'dmd', token: 'dmeoeome' } }));

        const home = render(<Provider store={store}>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
            </Routes>
        </Provider>, { wrapper: BrowserRouter })

        expect(home.getAllByTestId('userlogged')).toBeTruthy()
    })
})