document.addEventListener("DOMContentLoaded", function() {
    // Placeholder functions to simulate fetching data
    displayNifty50Data();
    displaySensexData();
    displayTopGainers();
    displayTopLosers();
    displayFinancialNews();

    // Refresh data every 5 minutes (300,000 milliseconds)
    setInterval(displayNifty50Data, 300000);
    setInterval(displaySensexData, 300000);
    setInterval(displayTopGainers, 300000);
    setInterval(displayTopLosers, 300000);
    setInterval(displayFinancialNews, 300000);
});

// Function to display NIFTY 50 data (Placeholder)
function displayNifty50Data() {
    const nifty50Price = "17,500"; // Placeholder value
    document.getElementById("nifty50").querySelector("span").textContent = nifty50Price;
}

// Function to display SENSEX data (Placeholder)
function displaySensexData() {
    const sensexPrice = "58,000"; // Placeholder value
    document.getElementById("sensex").querySelector("span").textContent = sensexPrice;
}

// Function to display Top Gainers (Placeholder)
function displayTopGainers() {
    const topGainers = "Stock A, Stock B, Stock C"; // Placeholder value
    document.getElementById("top-gainers").querySelector("span").textContent = topGainers;
}

// Function to display Top Losers (Placeholder)
function displayTopLosers() {
    const topLosers = "Stock X, Stock Y, Stock Z"; // Placeholder value
    document.getElementById("top-losers").querySelector("span").textContent = topLosers;
}

// Function to display Financial News (Placeholder)
function displayFinancialNews() {
    const newsHeadlines = "Market News 1 | Market News 2 | Market News 3"; // Placeholder value
    document.getElementById("news-ticker").querySelector("marquee").textContent = newsHeadlines;
}
