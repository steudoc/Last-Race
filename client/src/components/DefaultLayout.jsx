import { Alert, Col, Container, Row } from "react-bootstrap";
import NavHeader from "./NavHeader";
import { Outlet } from "react-router";

function DefaultLayout(props) {

    return(
        <>
            <NavHeader loggedIn={props.loggedIn} handleLogout={props.handleLogout} />
            <Container fluid className="page-center page-enter d-flex justify-content-center align-items-center p-3">
                {props.message && <Row className="d-flex justify-content-center mt-3">
                    <Col className="col-8">
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