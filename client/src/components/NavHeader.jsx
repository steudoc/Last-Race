import { Link } from "react-router";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { LogoutButton } from "./AuthComponents";
import { useEffect, useState } from "react";

function NavHeader(props) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // if darkMode === true, adds data-bs-theme to the html tag
        if (darkMode)
            document.documentElement.setAttribute("data-bs-theme","dark");
        // otherwise, removes data-bs-theme
        else
            document.documentElement.removeAttribute("data-bs-theme");
    }, [darkMode]);

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
                <Button onClick={() => setDarkMode(oldMode => !oldMode)}>
                    { darkMode ? <i className="bi bi-sun-fill" /> : <i className="bi bi-moon-fill" />}
                </Button>
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