import { render } from '@testing-library/react'
import GuestNav from './GuestNav'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

describe('Home page', () => {
    jest.setTimeout(6000)

    test('main link is there', async () => {
        const home = render(<Routes>
            <Route path="/" element={<GuestNav></GuestNav>}></Route>
        </Routes>, { wrapper: BrowserRouter })

        expect(home.getAllByTestId('main')).toBeTruthy()
    })  
})