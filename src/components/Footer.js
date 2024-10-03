import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
      <footer className="mt-auto py-3 bg-dark text-light">
        <Container>
          <Row>
            <Col className="text-center">
              <p>&copy; 2024 Stock Market App. All Rights Reserved.</p>
              <p>Made with ❤️ by [Your Name]</p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
}
export default Footer;