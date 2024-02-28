// api/hello.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello OtherWorld!');
});

module.exports = router;