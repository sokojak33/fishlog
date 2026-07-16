import { Navbar, Nav} from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { Link } from "react-router";

function AppNavbar() {
    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand as={Link} to="/">Fishlog</Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/account">Account</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>

    );
}

export default AppNavbar;