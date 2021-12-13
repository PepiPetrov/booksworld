import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link } from "react-router-dom"
import Logo from "../../util/Logo"
import Search from "../util/Search"
import Catalog from "../util/Catalog"

export default function GuestNav() {
    return <header style={{ backgroundColor: "#ACD646", width: "100%" }}>
        <Navbar bg="light" expand="lg">
            <Container style={{ backgroundColor: "#ACD646" }}>
                <Navbar.Brand to="/" as={Link} data-testid="main"><Logo /> BooksWorld</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Catalog />
                        <Search />
                        <Nav.Link to="/register" as={Link}>Register</Nav.Link>
                        <Nav.Link to="/login" as={Link}>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
}