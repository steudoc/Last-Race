import { Alert, Col, Container, Row, Image } from "react-bootstrap";
import NavHeader from "./NavHeader";
import { Outlet, useLocation } from "react-router";

function DefaultLayout(props) {
    const location = useLocation();
    const visible = location.pathname === '/' || location.pathname === '/login';

    return(
        <>
            <NavHeader loggedIn={props.loggedIn} handleLogout={props.handleLogout} />
            <Container fluid className="page-center page-enter d-flex justify-content-center align-items-center p-3 flex-column">
                {props.message && visible && <Row className="d-flex justify-content-center mt-3 w-100">
                    <Col xs={6}>
                        <Alert variant={props.message.type} onClose={() => props.setMessage("")} dismissible>
                            {props.message.msg}
                        </Alert>
                    </Col>   
                </Row>}
                <Outlet />
            </Container>
        </>
    );
}

export default DefaultLayout;