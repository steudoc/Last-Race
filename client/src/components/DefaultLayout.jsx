import { Alert, Col, Container, Row } from "react-bootstrap";
import NavHeader from "./NavHeader";
import { Outlet } from "react-router";

function DefaultLayout(props) {

    return(
        <>
            <NavHeader loggedIn={props.loggedIn} handleLogout={props.handleLogout} />
            <Container fluid className="page-center page-enter d-flex justify-content-center align-items-center p-3 flex-column">
                {props.message && <Row className="d-flex justify-content-center mt-3 w-100">
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