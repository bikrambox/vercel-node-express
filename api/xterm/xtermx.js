const express = require('express');
// const http = require('http');
const fs = require('fs');

const router = express.Router();
router.get('/', (req, res) => {
    try {
        // Read the HTML file
        fs.readFile('./index.html', (err, data) => {
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