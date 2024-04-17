

const express = require('express');
const { Client } = require('ssh2');

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    // Create SSH tunnel
    const sshConfig = {
      host: '209.182.205.2',
      port: 22,
      username: 'alegra6',
      privateKey: process.env.HELLOFATHING, //when working in Vercel
      debug: true
    };

    const sshTunnel = new Client();

    // Connect to SSH server
    await new Promise((resolve, reject) => {
      sshTunnel.on('error', reject);
      sshTunnel.on('ready', () => {
        console.log('SSH Tunnel is connected');
        resolve();
      });
      sshTunnel.connect(sshConfig);
    });
    // Execute command to fetch user information
    const command = 'whoami && ls -alh';
    const userInformation = await new Promise((resolve, reject) => {
      sshTunnel.exec(command, { pty: true }, (err, stream) => {
        if (err) {
          reject(err);
          return;
        }
        let data = '';
        stream
          .on('data', chunk => {
            data += chunk;
          })
          .on('end', () => {
            console.log('User information:', data);
            resolve(data);
          })
          .stderr.on('data', errData => {
            console.error('Error fetching user information_CMD:', errData.toString());
            reject(new Error('Error fetching user information_CMD'));
          });
      });
    });
    

    sshTunnel.end(); // Close SSH tunnel
    res.status(200).json({ message: 'User information fetched successfully', data: userInformation });
  } catch (error) {
    console.error('Error creating SSH tunnel or fetching user information_SSH:', error);
    res.status(500).json({ error: 'Internal server error_SSH' });    
  }
});

module.exports = router;