// api/hello.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello OtherWorlder!');
});

module.exports = router;