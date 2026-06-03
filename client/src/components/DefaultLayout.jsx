import { Alert, Col, Container, Row } from "react-bootstrap";
import NavHeader from "./NavHeader";
import { Outlet } from "react-router";

function DefaultLayout(props) {

    return(
        <>
            <NavHeader loggedIn={props.loggedIn} handleLogout={props.handleLogout} />
            <Container fluid>
                {props.message && <Row className="d-flex justify-content-center mt-3">
                    <Col className="col-8">
                        <Alert variant={props.message.type} onClose={() => props.setMessage("")} dismissible>
                            {props.message.msg}
                        </Alert>
                    </Col>   
                </Row>}
                <Row className="d-flex justify-content-center mt-3">
                    <Outlet />
                </Row>
            </Container>
        </>
    );
}

export default DefaultLayout;