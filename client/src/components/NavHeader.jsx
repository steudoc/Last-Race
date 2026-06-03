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
        <Navbar className="app-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Last <span>Race</span>
                </Navbar.Brand>
                <Nav className="me-auto">
                    {props.loggedIn && <>
                        <Nav.Link as={Link} to="/map" className={location.pathname === '/map' ? 'active' : ''}>Map</Nav.Link>
                        <Nav.Link as={Link} to="/game" className={location.pathname === '/game' ? 'active' : ''}>Play</Nav.Link>
                        <Nav.Link as={Link} to="/ranking" className={location.pathname === '/ranking' ? 'active' : ''}>Ranking</Nav.Link>
                    </>}
                </Nav>
                <Nav className="align-items-center gap-2">
                    <button className="theme-toggle-btn" onClick={() => setDarkMode(d => !d)} aria-label="Toggle theme">
                        <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`} />
                    </button>
                    {props.loggedIn ?
                        <LogoutButton handleLogout={props.handleLogout} /> :
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavHeader;