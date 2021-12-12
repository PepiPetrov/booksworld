import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from "react-router-dom"

export default function Search() {
    return <NavDropdown title="Search by">
        <NavDropdown.Item to="/search/title" as={Link}>Title</NavDropdown.Item>
        <NavDropdown.Item to="/search/author" as={Link}>Author</NavDropdown.Item>
        <NavDropdown.Item to="/search/genre" as={Link}>Genre</NavDropdown.Item>
        <NavDropdown.Item to="/search/series" as={Link}>Series</NavDropdown.Item>
    </NavDropdown>
}