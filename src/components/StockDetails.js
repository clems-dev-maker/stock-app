import React from "react";
import { Table } from 'react-bootstrap'

const StockDetails = ({ stockData }) => {
    if (!stockData) {
        return <div>No data available</div>
    }

    return (
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Volume</th>
            <th>Change</th>
            <th>Change %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stockData["01. symbol"]}</td>
            <td>{stockData["05. price"]}</td>
            <td>{stockData["02. open"]}</td>
            <td>{stockData["03. high"]}</td>
            <td>{stockData["04. low"]}</td>
            <td>{stockData["06. volume"]}</td>
            <td>{stockData["09. change"]}</td>
            <td>{stockData["10. change percent"]}</td>
          </tr>
        </tbody>
      </Table>
    );
};
export default StockDetails;