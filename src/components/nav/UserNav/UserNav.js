import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"
import Logo from "../../util/Logo"
import Search from "../util/Search"
import Catalog from '../util/Catalog'
import { logout as authSliceLogout } from '../../../redux/slices/authSlice'

export default function UserNav() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return <header style={{ backgroundColor: "#ACD646", width: "100%" }}>
        <Navbar bg="light" expand="lg">
            <Container style={{ backgroundColor: "#ACD646" }}>
                <Navbar.Brand to="/" as={Link}><Logo /> BooksWorld</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Catalog />
                        <Search />
                        <Nav.Link to="/create" as={Link}>Create</Nav.Link>
                        <NavDropdown title="Profile">
                            <NavDropdown.Item to="/profile/my" as={Link}>My books</NavDropdown.Item>
                            <NavDropdown.Item to="/profile/liked" as={Link}>Liked books</NavDropdown.Item>
                            <NavDropdown.Item to="/profile/favourite" as={Link}>Favourite books</NavDropdown.Item>
                            <NavDropdown.Item to="/profile/preferences" as={Link}>Book preferences</NavDropdown.Item>
                            <NavDropdown.Item to="/profile/recommended" as={Link}>Recommended books</NavDropdown.Item>
                            <NavDropdown.Item to="/profile/info" as={Link}>Profile info</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link to="/logout" as={Link} onClick={e => logout(e, dispatch, authSliceLogout, navigate)}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
}

function logout(e, dispatch, authSliceLogout, navigate) {
    e.preventDefault()
    dispatch(authSliceLogout())
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    navigate('/')
}