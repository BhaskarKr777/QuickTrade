const apiKey = 'HZ7AC5SY8S96N8QQ'; // Replace with your Alpha Vantage API key
const fetchInterval = 15000; // 15 seconds delay between API requests
const watchlist = [];

// Fetch Stock Data
async function fetchStockData(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('API Response:', data); // Log the entire response

        if (data['Time Series (5min)']) {
            displayStockData(data);
            renderChart(data, 'stockChart');
        } else if (data['Note']) {
            alert('API call limit reached. Please wait before making more requests.');
        } else {
            alert('No data found for the given stock symbol.');
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        alert('Failed to fetch stock data. Please try again later.');
    }
}

// Add to Watchlist
function addToWatchlist(symbol) {
    if (!watchlist.includes(symbol)) {
        watchlist.push(symbol);
        updateWatchlist();
    } else {
        alert('Stock is already in the watchlist.');
    }
}

// Update Watchlist
async function updateWatchlist() {
    const watchlistEl = document.getElementById('watchlist');
    watchlistEl.innerHTML = '';
    
    for (let i = 0; i < watchlist.length; i++) {
        const symbol = watchlist[i];
        const li = document.createElement('li');
        li.textContent = symbol;
        li.addEventListener('click', () => {
            fetchStockData(symbol);
        });
        watchlistEl.appendChild(li);

        // Delay between fetching data for multiple stocks
        if (i < watchlist.length - 1) {
            await new Promise(resolve => setTimeout(resolve, fetchInterval));
        }
    }
}

// Display Stock Data
function displayStockData(stockData) {
    const timeSeries = stockData['Time Series (5min)'];
    const latestTimestamp = Object.keys(timeSeries)[0];
    const latestData = timeSeries[latestTimestamp];

    document.getElementById('stock-name').querySelector('span').textContent = stockData['Meta Data']['2. Symbol'];
    document.getElementById('current-price').querySelector('span').textContent = `$${latestData['1. open']}`;
    document.getElementById('price-change').querySelector('span').textContent = `$${(latestData['1. open'] - latestData['4. close']).toFixed(2)}`;
}

// Calculate Moving Average
function calculateMovingAverage(data, period = 20) {
    let maData = [];
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            maData.push(null); // Not enough data to calculate MA
        } else {
            let sum = 0;
            for (let j = 0; j < period; j++) {
                sum += data[i - j];
            }
            maData.push(sum / period);
        }
    }
    return maData;
}

// Render Chart
function renderChart(stockData, chartId) {
    const ctx = document.getElementById(chartId).getContext('2d');
    const timeSeries = stockData['Time Series (5min)'];
    const labels = Object.keys(timeSeries);
    const prices = labels.map(timestamp => parseFloat(timeSeries[timestamp]['1. open']));
    const movingAverage = calculateMovingAverage(prices);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: prices,
                borderColor: 'rgba(0, 255, 0, 1)',
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                borderWidth: 2,
                fill: false
            }, {
                label: 'Moving Average (20 periods)',
                data: movingAverage,
                borderColor: 'rgba(0, 0, 255, 1)',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price'
                    },
                    beginAtZero: false
                }
            }
        }
    });
}

// Compare Stock
async function compareStock(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('API Response for Comparison:', data); // Log the entire response for comparison

        if (data['Time Series (5min)']) {
            renderChart(data, 'comparisonChart');
        } else if (data['Note']) {
            alert('API call limit reached. Please wait before making more requests.');
        } else {
            alert('No data found for the given stock symbol.');
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        alert('Failed to fetch stock data. Please try again later.');
    }
}

// Event Listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const symbol = document.getElementById('stock-symbol').value.trim();
    if (symbol) {
        fetchStockData(symbol); // Fetch data from Alpha Vantage API
    } else {
        alert('Please enter a stock symbol.');
    }
});

document.getElementById('add-watchlist-btn').addEventListener('click', () => {
    const symbol = document.getElementById('stock-symbol').value.trim();
    if (symbol) {
        addToWatchlist(symbol);
    } else {
        alert('Please enter a stock symbol.');
    }
});

document.getElementById('compare-btn').addEventListener('click', () => {
    const symbol = document.getElementById('compare-symbol').value.trim();
    if (symbol) {
        compareStock(symbol);
    } else {
        alert('Please enter a stock symbol.');
    }
});
