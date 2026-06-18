import { useActionState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
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
        <div className="page-center d-flex">
            <div className="metro-card m-1 col-4">
                {/* decorative lines*/}
                <div className="lines-row d-flex mb-4">
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
            </div>
        </div>
    );
}

export function LogoutButton(props) {
    return (
        <Button className="btn-logout-nav" onClick={props.handleLogout}>Logout</Button>
    );
}