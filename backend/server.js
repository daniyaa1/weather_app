require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors()); 

// Serve frontend static files (index.html, script.js, images, css)
// The frontend files live in the parent directory of backend/ in this repo layout.
app.use(express.static(path.join(__dirname, '..')));

const API_KEY = process.env.API_KEY; 


app.get('/weather', async (req, res) => {
    const city = req.query.city;
    try {
        if (!city) {
            return res.status(400).json({ error: 'Missing city parameter' });
        }

        if (!API_KEY) {
            console.error('API_KEY is not set in environment. Set API_KEY in .env or environment variables.');
            return res.status(500).json({ error: 'Server misconfiguration: API_KEY not set' });
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        );

        // forward successful response data
        return res.json(response.data);
    } catch (error) {
        // If the weather provider responded with a status, forward an appropriate message
        if (error.response) {
            const status = error.response.status;
            // 401 -> likely invalid API key
            if (status === 401) {
                console.error('OpenWeather returned 401 - invalid API key');
                return res.status(500).json({ error: 'Invalid or missing OpenWeather API key' });
            }
            if (status === 404) {
                return res.status(404).json({ error: 'City not found' });
            }
            // forward other statuses from provider
            return res.status(status).json({ error: error.response.data || 'Error from weather provider' });
        }

        // network / request setup error
        console.error('Error requesting weather:', error.message || error);
        return res.status(502).json({ error: 'Failed to reach weather provider' });
    }
});

// Simple status endpoint to check server and API key presence
app.get('/status', (req, res) => {
    const apiKeySet = !!API_KEY;
    res.json({
        ok: true,
        apiKeySet,
        message: apiKeySet ? 'API key present' : 'API key missing on server'
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
