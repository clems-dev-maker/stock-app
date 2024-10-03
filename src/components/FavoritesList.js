import React from "react";
import { ListGroup, Button } from "react-bootstrap";

const FavoritesList = ({ favorites, removeFavorite, fetchStockData}) => {
    return (
        <ListGroup>
        {favorites.length === 0 ? (
          <p>No favorites yet. Add stocks to your watchlist!</p>
        ) : (
          favorites.map((symbol) => (
            <ListGroup.Item key={symbol} className="d-flex justify-content-between align-items-center">
              <span>{symbol}</span>
              <div>
                <Button variant="info" onClick={() => fetchStockData(symbol)} className="mr-2">
                  View
                </Button>
                <Button variant="danger" onClick={() => removeFavorite(symbol)} style={{marginLeft: "10px"}}>
                  Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup> 
    );
};
export default FavoritesList;