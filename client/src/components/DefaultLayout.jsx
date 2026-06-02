import { Alert, Col, Container, Row } from "react-bootstrap";
import NavHeader from "./NavHeader";
import { Outlet } from "react-router";

function DefaultLayout(props) {

    return(
        <>
            <NavHeader loggedIn={props.loggedIn} handleLogout={props.handleLogout} />
            <Container fluid className="mt-3">
                {props.message && <Row>
                    <Col md={12}>
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