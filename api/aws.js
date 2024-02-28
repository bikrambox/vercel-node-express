// Load environment variables from .env file
require('dotenv').config();

// api/hello.js
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

// Configure AWS SDK with environment variables
AWS.config.update({
  accessKeyId: 'AKIAUHS4QYRIDFNDSQES',
  secretAccessKey: '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',
  region: 'eu-central-1'
});

// Create an EC2 service object
const ec2 = new AWS.EC2();

router.get('/', (req, res) => {
  // Specify the instance ID you want to retrieve information for
  const instanceId = 'i-006f85896d4d73415'; // Replace 'YOUR_INSTANCE_ID' with the actual instance ID

  // Call the DescribeInstances operation with the specific instance ID
  ec2.describeInstances({ InstanceIds: [instanceId] }, (err, data) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send('Error fetching instance details from AWS.');
    } else {
      if (data.Reservations.length > 0 && data.Reservations[0].Instances.length > 0) {
        const instance = data.Reservations[0].Instances[0];
        const instanceDetails = {
          InstanceId: instance.InstanceId,
          InstanceType: instance.InstanceType,
          State: instance.State.Name,
          // Add more fields as needed
        };
        res.json(instanceDetails);
      } else {
        res.status(404).send('Instance not found.');
      }
    }
  });

});

module.exports = router;
