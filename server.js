const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve the static files (HTML, CSS, JS) from the root directory
app.use(express.static(__dirname)); // Serve from the root directory

// Initialize visitor count file
const visitorCountFile = 'visitorCount.txt';

fs.exists(visitorCountFile, (exists) => {
    if (!exists) {
        fs.writeFile(visitorCountFile, '0', (err) => {
            if (err) {
                console.error('Could not initialize visitor count file:', err);
            } else {
                console.log('Initialized visitor count file with 0');
            }
        });
    }
});

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Adjust path to index.html
});

// API to get the visitor count
app.get('/api/visitor-count', (req, res) => {
    fs.readFile(visitorCountFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read visitor count.' });
        }
        const visitorCount = parseInt(data, 10) || 0;
        res.json({ count: visitorCount });
    });
});

// API to increment the visitor count
app.post('/api/increment-visitor-count', (req, res) => {
    fs.readFile(visitorCountFile, 'utf8', (err, data) => {
        let visitorCount = parseInt(data, 10) || 0;
        visitorCount += 1;
        fs.writeFile(visitorCountFile, visitorCount.toString(), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Could not update visitor count.' });
            }
            res.json({ count: visitorCount });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
