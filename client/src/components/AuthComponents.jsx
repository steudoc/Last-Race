import { useActionState } from "react";
import { Form, Alert, Button, Container } from "react-bootstrap";
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
        <div className="page-center">
            <div className="metro-card login-page-card">
                
                {/* Decorative Rail lines */}
                <div className="lines-row">
                    <div className="line-chip line-blue"></div>
                    <div className="line-chip line-red"></div>
                    <div className="line-chip line-yellow"></div>
                    <div className="line-chip line-purple"></div>
                    <div className="line-chip line-green"></div>
                    <div className="line-chip line-orange"></div>
                </div>

                <p className="text-accent font-mono-custom small fw-bold text-uppercase mb-1">
                    ALL ABOARD
                </p>
                <h2 className="login-title">Login</h2>
                <p className="login-subtitle">Enter your credentials</p>

                {isPending && (
                    <Alert className="metro-alert metro-alert-warning py-2">
                        CONNECTING TO SERVER...
                    </Alert>
                )}
                {state?.error && (
                    <Alert className="metro-alert metro-alert-danger py-2">{state.error}</Alert>
                )}

                <Form action={formAction}>
                    <Form.Group className="mb-3">
                        <label className="metro-label">Username</label>
                        <Form.Control type="text" name="username" required className="metro-input" />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                        <label className="metro-label">Password</label>
                        <Form.Control type="password" name="password" required className="metro-input" />
                    </Form.Group>
                    
                    <div className="d-flex gap-2 mt-4">
                        <button type="submit" className="btn-metro flex-grow-1" disabled={isPending}>
                            Login
                        </button>
                        <Link className="btn-metro-outline" to="/">Cancel</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export function LogoutButton(props) {
    return (
        <Button className="btn-logout-nav" onClick={props.handleLogout}>Logout</Button>
    );
}