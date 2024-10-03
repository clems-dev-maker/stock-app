import React, {useState} from "react";
import {Form, Button} from 'react-bootstrap'

const StockSearch = ({ onSearch })=> {
    const [symbol, setSymbol] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        if (symbol) {
            onSearch(symbol)
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="d-flex justify-content-center mb-4">
            <Form.Control
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter stock symbol (e.g., AAPL)"
                className="w-50 mr-2"
            />
            <Button type="submit" variant="primary" style={{marginLeft: "10px"}}>Search</Button>
        </Form>
    )
};
export default StockSearch;