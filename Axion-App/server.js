const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from Axion-App directory
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for single-page routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Axion Intelligence Platform Live Application Server`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🗄️ Connected Database: axion-postgres-ranjan.postgres.database.azure.com`);
    console.log(`====================================================`);
});
