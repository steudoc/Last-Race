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
        <div className="page-center page-enter">
            <div className="metro-card login-page-card">
                <div className="lines-row">
                    <div className="line-chip line-blue"></div>
                    <div className="line-chip line-red"></div>
                    <div className="line-chip line-yellow"></div>
                    <div className="line-chip line-purple"></div>
                    <div className="line-chip line-green"></div>
                    <div className="line-chip line-orange"></div>
                </div>

                <p className="eyebrow">Login</p>
                <h2 className="login-title">All Aboard</h2>
                <p className="login-subtitle">Enter your credentials to access the game</p>

                {isPending && <Alert variant="warning" className="py-2">Connecting...</Alert>}
                {state?.error && <Alert variant="danger" className="py-2">{state.error}</Alert>}

                <Form action={formAction}>
                    <Form.Group className="mb-3">
                        <label className="label">Username</label>
                        <Form.Control type="text" name="username" required className="metro-input" />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <label className="label">Password</label>
                        <Form.Control type="password" name="password" required className="metro-input" />
                    </Form.Group>
                    <div className="d-flex gap-2">
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
    return <Button variant="metro-btn-outline btn-logout" onClick={props.handleLogout}>Logout</Button>;
}