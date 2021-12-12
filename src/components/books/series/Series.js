import { useState } from 'react'
import { useParams } from 'react-router'
import { getBySeries } from '../../../services/books-service'
import BookItem from '../utils/BookItem'

export default function Series() {
    const [books, setBooks] = useState([])
    const { name } = useParams()
    getBySeries(name).then(x => {
        setBooks(x)
    })
    return books.map(x => <BookItem book={x}></BookItem>)
}