import React, {useState, useEffect} from 'react';
import axios from 'axios';
import StockSearch from './components/StockSearch';
import StockDetails from './components/StockDetails';
import StockNews from './components/StockNews';
import StockFilter from './components/StockFilter';
import FavoritesList from './components/FavoritesList';
import NavBar from './components/NavBar';
import { Line } from 'react-chartjs-2';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import 'chart.js/auto';

function App() {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]); // Ajout des actions filtrées
  const [darkMode, setDarkMode] = useState(false); // Pour le mode sombre

  const allStocks = [
    { symbol: 'AAPL', sector: 'Technology', industry: 'Hardware' },
    { symbol: 'MSFT', sector: 'Technology', industry: 'Software' },
    { symbol: 'JNJ', sector: 'Healthcare', industry: 'Pharmaceuticals' },
    { symbol: 'XOM', sector: 'Energy', industry: 'Oil & Gas' },
    { symbol: 'TSLA', sector: 'ConsumerGoods', industry: 'Automobiles' }
  ];

  // Charger les favoris à partir du localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    // Charger le mode sombre/clair
    const storedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedTheme);
  }, []);

  const fetchStockData = async (symbol) => {
    setLoading(true);
    setError(null);

    const API_KEY = "27RUY1XNZU47P9NH"
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    const historicalUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

    try {
      // Fetch current stock data
      const response = await axios.get(url);
      if (response.data['Global Quote']) {
        setStockData(response.data['Global Quote']);
      } else {
        setError('No data found for this symbol');
      }

      // Fetch historical data for chart
      const historicalResponse = await axios.get(historicalUrl);
      if (historicalResponse.data['Time Series (Daily)']) {
        const timeSeries = historicalResponse.data['Time Series (Daily)'];
        const dates = Object.keys(timeSeries).slice(0, 10).reverse();
        const prices = dates.map((date) => timeSeries[date]['4. close']);
        setChartData({
          labels: dates,
          datasets: [
            {
              label: `Stock Price for ${symbol}`,
              data: prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        });
      }
    } catch (err) {
      setError('Error fetching stock data');
    }
    
    setLoading(false);
  };

  const addFavorite = (symbol) => {
    if (!favorites.includes(symbol)) {
      const updatedFavorites = [...favorites, symbol];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (symbol) => {
    const updatedFavorites = favorites.filter(fav => fav !== symbol);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites',  JSON.stringify(updatedFavorites));
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const handleFilter = ({ sector, industry }) => {
    const filtered = allStocks.filter(stock => {
      return (!sector || stock.sector === sector) && (!industry || stock.industry === industry);
    });
    setFilteredStocks(filtered); // Mettre à jour la liste des actions filtrées
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h1>Stock Market App</h1>
            <StockSearch onSearch={fetchStockData} />
            {stockData && (
              <Button variant="success" onClick={() => addFavorite(stockData['01. symbol'])}>
                Add to Favorites
              </Button>
            )}
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col md={6}>
            <h3>Your Favorite Stocks</h3>
            <FavoritesList favorites={favorites} removeFavorite={removeFavorite} fetchStockData={fetchStockData} />
          </Col>
        </Row>

        {/* Composant de filtre */}
        <Row className="mt-5">
          <Col md={8} className="mx-auto">
            <StockFilter onFilter={handleFilter} />
            {filteredStocks.length > 0 && (
              <ul>
                {filteredStocks.map((stock, index) => (
                  <li key={index}>
                    {stock.symbol} - {stock.sector} - {stock.industry}
                  </li>
                ))}
              </ul>
            )}
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
        </Row>

        {stockData && (
          <>
            <Row className="justify-content-center">
              <Col md={10}>
                <StockDetails stockData={stockData} />
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col md={10}>
                {chartData && (
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col md={10}>
                {/* Intégrer le composant d'actualités */}
                <StockNews symbol={stockData['01. symbol']} />/
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
export default App;