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
        <div className="d-flex justify-content-center align-items-center beach-bg beach-login-bg">
            <div className="beach-card beach-login-card">
                <h2 className="text-center mb-4 beach-title">
                    <span role="img" aria-label="passport"></span> Login
                </h2>
                { isPending && <Alert variant="warning">Please, wait for the server's response...</Alert> }
                <Form action={formAction}>
                    <Form.Group controlId='username' className='mb-3'>
                        <Form.Label className="beach-form-label">Username</Form.Label>
                        <Form.Control type='text' name='username' required className="beach-form-input" />      
                    </Form.Group>
                    <Form.Group controlId='password' className='mb-3'>
                        <Form.Label className="beach-form-label">Password</Form.Label>
                        <Form.Control type='password' name='password' required className="beach-form-input" />
                    </Form.Group>
                    {/* messaggio d'errore in inserimento di credenziali (se presente) */}
                    {state.error && <p className="text-danger">{state.error}</p>}
                    <div className="d-flex justify-content-center gap-2 mt-3">
                        <Button type='submit' className="beach-btn beach-login-btn" disabled={isPending}>Login</Button>
                        <Link className='btn btn-outline-danger beach-btn' to={'/'} disabled={isPending}>Cancel</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export function LogoutButton(props) {
    return <Button variant="outline-light" onClick={props.handleLogout}>Logout</Button>;
}