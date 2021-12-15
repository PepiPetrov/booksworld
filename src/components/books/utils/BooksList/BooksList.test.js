import { render } from '@testing-library/react'
import BooksList from './BooksList'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

describe('books list', () => {
    const books = [{ title: "fmmdmdmd", description: "dmemmmdmdmdmmdmd", _id: "mdme" }, { title: "fmmdmdsadmd", description: "dmemmmdmdsadmdmmdmd", _id: "mddddme" }]


    test('works with books', () => {
        const list = render(
            <Routes>
                <Route path="/" element={<BooksList books={books}></BooksList>}></Route>
            </Routes>, { wrapper: BrowserRouter })

        const all = list.getAllByTestId('booksrow')
        expect(all.length).toBe(1)
    })
})
