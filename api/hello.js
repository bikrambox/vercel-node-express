// api/hello.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello OtherWorld!');
  const currentDirectory = process.cwd();
  console.log('Current working directory:', currentDirectory);
});

module.exports = router;