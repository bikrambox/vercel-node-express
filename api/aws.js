// Load environment variables from .env file
require('dotenv').config();

// api/hello.js
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

// Configure AWS SDK with environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Create an EC2 service object
const ec2 = new AWS.EC2();

router.get('/', (req, res) => {
  // Define parameters for DescribeInstances API call
  const params = {
    Filters: [
      {
        Name: 'Instance ID', // Filter by instance ID
        Values: ['process.env.INSTANCE_ID'] // Replace 'YOUR_INSTANCE_ID' with your specific instance ID
      }
    ]
  };

  // Call the DescribeInstances operation
  ec2.describeInstances(params, (err, data) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send('Error fetching instances from AWS.');
    } else {
      const instances = [];
      // Parse the response and extract instance information
      data.Reservations.forEach(reservation => {
        reservation.Instances.forEach(instance => {
          instances.push({
            InstanceId: instance.InstanceId,
            InstanceType: instance.InstanceType,
            State: instance.State.Name
            // Add more fields as needed
          });
        });
      });
      // Send the list of instances as JSON response
      res.json(instances);
    }
  });
});

module.exports = router;
