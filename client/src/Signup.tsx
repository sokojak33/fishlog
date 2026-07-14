import Card from 'react-bootstrap/Card'
//import './Signup.css'
import { useState } from 'react'
import { Link } from 'react-router'

const MIN_USERNAME_LENGTH= 5;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MIN_PASSWORD_LENGTH = 8;

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSignup(e){
        e.preventDefault();

        const user = username.trim();
        const emailIn = email.trim();
        const pass = password;
        const confirmPass = confirmPassword;

        if (user.length < MIN_USERNAME_LENGTH){
            alert(`Username must be at least ${MIN_USERNAME_LENGTH} characters!`);
        }else if (!EMAIL_REGEX.test(emailIn)) {
            alert("Email must be valid (example@site.com)");
        } else  if (pass.length < MIN_PASSWORD_LENGTH) {
            alert(`Password must be at least ${MIN_PASSWORD_LENGTH} characters!`);
        } else if (pass !== confirmPass) {
            alert("Passwords do not match!");
        } else {
            // more else ifs for specifics, will use regex for email and mabye other parts
            // do backend validation here
            alert(`Signed up as ${user}, welcome to fishLog!`);
        }
    }

    return (
        <main>
            <Card className="signup-card">
                <Card.Title className="title">Sign Up</Card.Title>
                <Card.Body>
                    <form className="user-input" onSubmit={handleSignup}>
                        <label htmlFor="username">Username</label>
                        <input
                          id = "username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />        
                        <label htmlFor="email">Email</label>
                        <input
                          id = "email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />  
                        <label htmlFor="password">Password:</label>
                        <input  
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input  
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button 
                            disabled={!(username.trim() && email.trim()  && password  && confirmPassword)}
                            type="submit">
                            Sign Up
                        </button>
                    </form>

                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </Card.Body>
            </Card>
        </main>
    );
}

export default Signup;