import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const NavBar = ( { darkMode, toggleDarkMode }) => {
    return (
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="#">Stock Market App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#favorites">Favorites</Nav.Link>
            </Nav>
            <Button
              onClick={toggleDarkMode}
              variant={darkMode ? "outline-light" : "outline-dark"}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
export default NavBar;