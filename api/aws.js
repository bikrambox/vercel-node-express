// Load environment variables from .env file
require('dotenv').config();

// api/hello.js
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

// Configure AWS SDK with environment variables
AWS.config.update({
  accessKeyId: process.env.KEYER,
  secretAccessKey: process.env.SECRET_KEYER,
  region: process.env.REG
});

// Create an EC2 service object
const ec2 = new AWS.EC2();

router.get('/', (req, res) => {
  // Specify the instance ID you want to retrieve information for
  const instanceId = process.env.INSTANCER; // Replace 'YOUR_INSTANCE_ID' with the actual instance ID

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
