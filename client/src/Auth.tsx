import Card from 'react-bootstrap/Card'
import './Auth.css'

function Auth() {
    return (
        <main>
            <Card className="login-card">
                <Card.Title className="title">Log In</Card.Title>
                <Card.Body>
                    <section className="user-input">
                        <label>Username:</label>
                        <input name = "userInput"/>
                        <label>Password:</label>
                        <input name = "passInput"/>
                    </section>

                    <button>Login</button>
                    <p>Dont have an account? <a>Create one</a></p>
                </Card.Body>
            </Card>
        </main>
    );
}

export default Auth;