import { Link } from "react-router";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { LogoutButton } from "./AuthComponents";
import { useEffect, useState } from "react";

function NavHeader(props) {

    return (
        <Navbar className="app-navbar" expand="sm">
            <Container>
                {/* Logo e Titolo */}
                <Navbar.Brand as={Link} to="/">
                    <i className="bi bi-train-front text-accent me-2"></i>
                    Last Race
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="main-navbar-nav" className="border-0" />
                <Navbar.Collapse id="main-navbar-nav">
                    
                    {/* Link centrali/sinistra visibili solo se loggato */}
                    <Nav className="me-auto mt-2 mt-sm-0">
                        {props.loggedIn && (
                            <>
                                <Nav.Link as={Link} to="/map">Map</Nav.Link>
                                <Nav.Link as={Link} to="/game">Play</Nav.Link>
                                <Nav.Link as={Link} to="/ranking">Ranking</Nav.Link>
                            </>
                        )}
                    </Nav>
                    
                    {/* Sezione destra: Login o pulsante Logout */}
                    <Nav className="align-items-center gap-2 mt-3 mt-sm-0">
                        {props.loggedIn ? (
                            <LogoutButton handleLogout={props.handleLogout} />
                        ) : (
                            <Link to="/login" className="btn-metro py-1.5 px-3 fs-6 rounded-3">
                                Sign In
                            </Link>
                        )}
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavHeader;