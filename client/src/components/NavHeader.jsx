import { Link, useLocation } from "react-router";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { LogoutButton } from "./AuthComponents";
import { useEffect, useState } from "react";

function NavHeader(props) {
    const location = useLocation();
    const isPlaying = location.pathname === '/game/plan';

    return (
        <Navbar className="app-navbar" expand="sm">
            <Container>
                {/* title */}
                <Navbar.Brand as={Link} to={isPlaying ? "#" : "/"}>
                    <i className="bi bi-train-front text-accent me-2"></i>
                    Last Race
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="main-navbar-nav" className="border-0" />
                <Navbar.Collapse id="main-navbar-nav">
                    
                    {/* links */}
                    <Nav className="me-auto mt-2 mt-sm-0">
                        {props.loggedIn && !isPlaying && (
                            <>
                                <Nav.Link as={Link} to="/map">Map</Nav.Link>
                                <Nav.Link as={Link} to="/game/setup">Play</Nav.Link>
                                <Nav.Link as={Link} to="/ranking">Ranking</Nav.Link>
                            </>
                        )}
                    </Nav>
                    
                    {/* login/logout */}
                    <Nav className="align-items-center gap-2 mt-3 mt-sm-0">
                        {props.loggedIn ? (
                            !isPlaying && <LogoutButton handleLogout={props.handleLogout} />
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