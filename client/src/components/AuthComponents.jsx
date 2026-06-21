import { useActionState } from "react";
import { Form, Alert, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";

export function LoginForm(props) {
    // state and action of the form managed with useActionState
    const [state, formAction, isPending] = useActionState(loginFunction, {username: '', password: ''});

    async function loginFunction(prevState, formData) {
        const credentials = {
            username: formData.get('username'),
            password: formData.get('password'),
        };
        try {
            await props.handleLogin(credentials);
            return { success: true };
        } catch(err) {
            return { error: "Login failed. Check your credentials. "};
        }
    }

    return (
        <Row className="w-100 justify-content-center page-center">
            <Col xs={12} sm={8} md={6} lg={4} className="metro-card login-page-card">
                {/* decorative lines*/}
                <Row className="lines-row mb-4">
                    <Col className="line-chip line-blue"></Col>
                    <Col className="line-chip line-red"></Col>
                    <Col className="line-chip line-yellow"></Col>
                    <Col className="line-chip line-purple"></Col>
                    <Col className="line-chip line-green"></Col>
                    <Col className="line-chip line-orange"></Col>
                </Row>

                <p className="text-accent font-mono-custom small fw-bold text-uppercase mb-1">
                    ALL ABOARD
                </p>
                <h2 className="login-title">Login</h2>
                <p className="login-subtitle mb-4">Enter your credentials</p>

                {isPending && (
                    <Alert className="metro-alert metro-alert-warning py-2">
                        LOADING...
                    </Alert>
                )}
                {state?.error && (
                    <Alert className="metro-alert metro-alert-danger py-2">{state.error}</Alert>
                )}

                <Form action={formAction}>
                    <Form.Group className="mb-3">
                        <label className="metro-label mb-1">Username</label>
                        <Form.Control type="text" name="username" required className="metro-input" />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                        <label className="metro-label mb-1">Password</label>
                        <Form.Control type="password" name="password" required className="metro-input" />
                    </Form.Group>
                    
                    <div className="d-flex gap-2 mt-4">
                        <Button type="submit" className="btn-metro flex-grow-1" disabled={isPending}>
                            Login
                        </Button>
                        <Link className="btn-metro-outline" to="/">Cancel</Link>
                    </div>
                </Form>
            </Col>
        </Row>
    );
}

export function LogoutButton(props) {
    return (
        <Button className="btn-logout-nav" onClick={props.handleLogout}>Logout</Button>
    );
}