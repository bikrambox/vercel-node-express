// index.js
const express = require('express');
const app = express();
const helloRoute = require('./api/hello');
const awsRoute = require('./api/aws');

const port = 3000;

app.use('/api/hello', helloRoute);
app.use('/api/aws', awsRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});