import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router";

function PublicNavbar() {
  return (
    <div>
      <Navbar className="app-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Fishlog
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/login">
              Log In
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default PublicNavbar;
