import { Link, useNavigate } from "react-router";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import API from "../API/API";
import { LogoutButton } from "./AuthComponents";

function NavHeader(props) {
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Last Race</Navbar.Brand>
                <Nav className="me-auto">
                    { props.loggedIn && <>
                        <Nav.Link as={Link} to="/map">Map</Nav.Link>
                        <Nav.Link as={Link} to="/game">Play</Nav.Link>
                        <Nav.Link as={Link} to="/ranking">Ranking</Nav.Link>
                    </>}
                </Nav>
                <Nav>
                    { props.loggedIn ? 
                        <LogoutButton handleLogout={props.handleLogout} /> :
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavHeader;