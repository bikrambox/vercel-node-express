const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    try {
        const indexPath = path.join(__dirname, 'index.html'); // Constructs the absolute path to index.html
        // Read the HTML file
        fs.readFile(indexPath, (err, data) => {
            if (err) {
                res.status(404).send("404 Not Found");
            } else {
                // Send the HTML file as the response
                res.status(200).type('html').send(data);
            }
        });
    } catch (error) {
        console.error('Error serving HTML file:', error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;