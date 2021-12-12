import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"

export default function Catalog() {
    return <NavDropdown title="Books">
        <NavDropdown.Item to="/books/all" as={Link}>All books</NavDropdown.Item>
        <NavDropdown.Item to="/books/newest" as={Link}>New books</NavDropdown.Item>
        <NavDropdown.Item to="/books/liked" as={Link}>Most liked books</NavDropdown.Item>
    </NavDropdown>
}