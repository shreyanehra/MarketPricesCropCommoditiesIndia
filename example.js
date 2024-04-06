const axios = require('axios');

// Function to fetch market prices based on user query
async function fetchAndExtractMarketData(commodity, state, district, mandi) {
    const apiKey = '579b464db66ec23bdd000001e9a0ac8050f0435e4c2d7495d20f829c';
    const apiUrl = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

    try {
        const response = await axios.get(apiUrl, {
            params: {
                'api-key': apiKey,
                format: 'json',
                'filters[commodity]': commodity,
                'filters[state]': state,
                'filters[district]': district, // Leave empty for no specific district
                'filters[market]': mandi   // ================================ market
            }
        });

        // Extract fields from the first record
        const records = response.data.records;
        const extractedDataArray = records.map(record => ({
            state: record.state,
            district: record.district,
            market: record.market,
            commodity: record.commodity,
            variety: record.variety,
            grade: record.grade,
            arrivalDate: record.arrival_date,
            minPrice: record.min_price,
            maxPrice: record.max_price,
            modalPrice: record.modal_price
        }));
        
        return extractedDataArray;
    } catch (error) {
        console.error('Error fetching and extracting market data:', error);
        throw error;
    }
}

// Example usage
fetchAndExtractMarketData('Ridgeguard(Tor)', 'Karnataka')
    .then(extractedData => {
        if (extractedData) {
            console.log('Extracted Data:', extractedData);

        } else {
            console.log('No records found.');
        }
    })
    .catch(error => console.error('Error:', error));
