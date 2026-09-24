import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router";

function SignedInNavbar() {
  return (
    <div>
      <Navbar className="app-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Fishlog
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/catches">
              Catch History
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default SignedInNavbar;
