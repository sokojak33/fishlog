import Card from 'react-bootstrap/Card'
import './Login.css'
import { useState } from 'react'

const MIN_USERNAME_LENGTH= 5;
const MIN_PASSWORD_LENGTH = 8;

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function handleLogin(e){
        e.preventDefault();

        const user = username.trim();
        const pass = password;

        if (user.length < MIN_USERNAME_LENGTH){
            alert(`Username must be at least ${MIN_USERNAME_LENGTH} characters!`);
        } else  if (pass.length < MIN_PASSWORD_LENGTH) {
            alert(`Password must be at least ${MIN_PASSWORD_LENGTH} characters!`);
        } else {
            // do backend validation here
            alert(`Logged in as ${user}!`);
        }

    }

    return (
        <main>
            <Card className="login-card">
                <Card.Title className="title">Log In</Card.Title>
                <Card.Body>
                    <form className="user-input" onSubmit={handleLogin}>
                        <label htmlFor="username">Username</label>
                        <input
                          id = "username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />                    
                        <label htmlFor="password">Password:</label>
                        <input  
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                            disabled={!(username.trim()  && password)}
                            type="submit">
                            Login
                        </button>
                    </form>

                    <p>Don't have an account? <a href="https://google.com">Create one</a></p>
                </Card.Body>
            </Card>
        </main>
    );
}

export default Login;