import { useEffect, useState } from "react"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"
import { getAll } from '../../../services/books-service'

export default function Catalog() {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoading) {
            getAll().then(x => {
                setBooks(x)
            })
        }

        return () => {
            setIsLoading(false)
        }
    })

    return <NavDropdown title="Books">
        <NavDropdown.Item to="/books/all" as={Link}>All books ({books.length} book{books.length > 1 ? 's' : ''})</NavDropdown.Item>
        <NavDropdown.Item to="/books/newest" as={Link}>New books (12 recently added books)</NavDropdown.Item>
        <NavDropdown.Item to="/books/liked" as={Link}>Most liked books (12 most liked books)</NavDropdown.Item>
    </NavDropdown>
}