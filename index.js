// index.js
const express = require('express');
const app = express();
const helloRoute = require('./api/hello');
const port = 3000;

app.use('/api', helloRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});