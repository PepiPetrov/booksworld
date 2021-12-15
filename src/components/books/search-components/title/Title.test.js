import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Title from './Title'

describe('search', () => {

    beforeEach(() => {
        jest.mock('../../../../services/search-service.js', () => {
            return {
                searchByTitle: () => {
                    return [{ title: "SQL", description: "slele", _id: "slele" }]
                }
            }
        })
    })

    test('search works with keyword', () => {
        const { getByRole, getAllByTestId, getByTestId } = render(<Routes>
            <Route path="/" element={<Title></Title>}></Route>
            <Route path="/search/title" element={<Title></Title>}></Route>
        </Routes>, { wrapper: BrowserRouter })

        const form = getByTestId("form")
        const input = getByRole('input')

        fireEvent.change(input, { target: { value: "SQL" } })
        fireEvent.submit(form)

        const invalidInput = getByRole("invalid-input")

        expect(invalidInput).toBeTruthy()

        const list = getAllByTestId("booksrow")

        expect(list.length).toBe(1)
    })
})