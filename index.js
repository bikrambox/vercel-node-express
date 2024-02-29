// index.js
const express = require('express');
const path = require('path');
const port = 3000;
const app = express();
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


const helloRoute = require('./api/hello');
const awsRoute = require('./api/aws');

app.use('/api/hello', helloRoute);
app.use('/api/aws', awsRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// // Start the server
// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });