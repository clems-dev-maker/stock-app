import React, {useState, useEffect} from "react";
import axios from "axios";
import { ListGroup, Spinner, Alert, Form, Button, Row, Col } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component'; // Importation de la bibliothèque de notation

const StockNews = ({ symbol }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({ sortBy: 'publishedAt', language: 'en' }); // Filtrage initial
    const [page, setPage] = useState(1) // Pagination
    const [totalResults, setTotalResults] = useState(0); // Total des articles


    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null)

            const API_KEY = '477c267591734277a75bfa303f0f07cb';
            const url = `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${API_KEY}`;

            try {
                const response = await axios.get(url);
                if (response.data.articles) {
                    setNews(response.data.articles)
                    setTotalResults(response.data.totalResults); // Nombre total d'articles
                } else {
                    setError('No news found for this symbol.'); 
                }
            } catch (error) {
                setError('Error fetching news.');
            }
            setLoading(false)
        }
        if (symbol) {
            fetchNews();
        }
    }, [symbol, filter, page]); // Rechargement à chaque modification de filtre ou de page

    const handleFilterChange = (e) => {
      const {name, value} = e.target;
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value
      }));
    };

    const handleRatingChange = (newRating, index) => {
      // Vous pouvez gérer le changement de notation ici
      console.log(`Article ${index + 1} rated ${newRating} stars`);
    };

    return (
      <div className="mt-4">
        <h3>Latest News for {symbol}</h3>
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Sort By</Form.Label>
                <Form.Control
                  as="select"
                  name="sortBy"
                  value={filter.sortBy}
                  onChange={handleFilterChange}
                  style={{marginBottom: "15px"}}
                >
                  <option value="publishedAt">Date</option>
                  <option value="popularity">Popularité</option>
                  <option value="relevancy">Pertinence</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Language</Form.Label>
                <Form.Control
                  as="select"
                  name="language"
                  value={filter.language}
                  onChange={handleFilterChange}
                >
                  <option value="en">Anglais</option>
                  <option value="fr">Français</option>
                  <option value="de">Allemand</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {!loading && news.length > 0 && (
          <>
            <ListGroup>
              {news.map((article, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  href={article.url}
                  target="_blank"
                >
                  <h5>{article.title}</h5>
                  <p>{article.description}</p>
                  <small className="text-muted">
                    Source: {article.source.name}
                  </small>
                  <ReactStars
                    count={5}
                    onChange={(newRating) =>
                      handleRatingChange(newRating, index)
                    }
                    size={24}
                    activeColor="#ffd700"
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="mt-3">
              <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <Button
                className="ml-2"
                disabled={news.length === 0 || page * 20 >= totalResults}
                onClick={() => setPage(page + 1)}
                style={{marginLeft: "10px"}}
              >
                Next
              </Button>
              <p>
                Page {page} of {Math.ceil(totalResults / 20)}
              </p>
            </div>
          </>
        )}
      </div>
    );
};
export default StockNews;