import React, {useState} from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';

const StockFilter = ({ onFilter }) => {
    const [sector, setSector] = useState('');
    const [industry, setIndustry] = useState('')

    const sectors = [
        'Technology',
        'Healthcare',
        'Financials',
        'Energy', 
        'Consumer Goods',
        'Industrials',
    ];

    const industries = {
        Technology: ['Software', 'Hardware', 'Semiconductors'],
        Healthcare: ['Biotechnology', 'Medical Devices', 'Pharmaceuticals'],
        Financials: ['Banking', 'Insurance', 'Investment Services'],
        Energy: ['Oil & Gas', 'Renewable Energy', 'Utilities'],
        ConsumerGoods: ['Food & Beverage', 'Household Products', 'Retail'],
        Industrials: ['Manufacturing', 'Aerospace', 'Transportation']
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        onFilter({ sector, industry });
    }

    return (
      <Form onSubmit={handleFilterSubmit} className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Group controlId="sectorSelect">
              <Form.Label>Sector</Form.Label>
              <Form.Control
                as="select"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="">Choose a sector...</option>
                {sectors.map((sector, index) => (
                  <option key={index} value={sector}>
                    {sector}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="industrySelect">
              <Form.Label>Industry</Form.Label>
              <Form.Control
                as="select"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                disabled={!sector} // Désactiver si aucun secteur n'est sélectionné
              >
                <option value="">Choose an industry...</option>
                {sector &&
                  industries[sector].map((industry, index) => (
                    <option key={index} value={industry}>
                      {industry}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" style={{marginTop: "15px"}}>
          Filter Stocks
        </Button>
      </Form>
    );
};
export default StockFilter;