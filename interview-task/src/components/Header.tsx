import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Brand href="#" className="ms-4">
          <img
            alt="logo"
            src="/logo.png"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="ms-4">
          <Nav
            className="ms-auto my-2 my-lg-0 me-5"
            style={{ maxHeight: "50vh" }}
            navbarScroll
          >
            <Nav.Link href="#equations">Equations</Nav.Link>
            <Nav.Link href="#results">Results</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
