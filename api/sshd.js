// // // const express = require('express');
// // // const redis = require('redis');

// // // const router = express.Router();
// // // const client = redis.createClient({
// // //     host: '209.182.205.2',
// // //     port: 6379,
// // //     // add any other options here if needed
// // // });

// // // // Check if the connection is successful
// // // client.on('connect', function() {
// // //     console.log('Connected to Redis');
// // //     // Send PING to Redis and listen for PONG
// // //     client.ping(function(err, reply) {
// // //         if (err) {
// // //             console.error('Error sending ping:', err);
// // //             // If there's an error, you might want to handle it or respond accordingly
// // //         } else {
// // //             console.log('Received pong:', reply);
// // //             // If PONG is received, you might want to log it or respond accordingly
// // //         }
// // //         // Close the Redis client
// // //         client.quit(function (err, res) {
// // //             console.log('Exiting from Redis');
// // //         });
// // //     });
// // // });

// // // module.exports = router;



// // const express = require('express');
// // const redis = require('redis');
// // const { Client } = require('ssh2');

// // const router = express.Router();

// // router.get('/', async (req, res) => {
// //     try {
// //         // Create SSH tunnel
// //         const sshConfig = {
// //             host: '209.182.205.2',
// //             port: 22,
// //             username: 'alegra6',
// //             privateKey: require('fs').readFileSync('/home/controlpl/Documents/Dacs/vercel_node/api/alegra6ser'),
// //             // Add any other necessary SSH options
// //         };
// //         const sshTunnel = new Client();
        
// //         // Connect to SSH server
// //         await new Promise((resolve, reject) => {
// //             sshTunnel.on('error', reject);
// //             sshTunnel.on('ready', () => {
// //                 console.log('SSH Tunnel is connected');
// //                 resolve();
// //             });
// //             sshTunnel.connect(sshConfig);
// //         });
// //    // Once connected, create Redis client
// //    const client = redis.createClient({
// //     host: 'localhost', // Tunnel will forward the traffic to the remote Redis server
// //     port: 6379, // Redis default port
// //     // Add any other necessary Redis options
// // });

// // // Fetch keys from Redis
// // client.keys('*', (err, keys) => {
// //     if (err) {
// //         console.error('Error fetching keys from Redis:', err);
// //         res.status(500).json({ error: 'Internal server error' });
// //     } else {
// //         // Send keys in JSON format
// //         res.json({ keys });

// //         // Close SSH tunnel and Redis client after response is sent
// //         client.quit();
// //         sshTunnel.end();
// //     }
// // });
// // } catch (error) {
// // console.error('Error creating SSH tunnel:', error);
// // res.status(500).json({ error: 'Internal server error' });
// // }
// // });

// // module.exports = router;


// const express = require('express');
// const redis = require('redis');
// const { Client } = require('ssh2');

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     // Create SSH tunnel
//     const sshConfig = {
//       host: '209.182.205.2',
//       port: 22,
//       username: 'alegra6',
//       privateKey: require('fs').readFileSync('/home/controlpl/Documents/Dacs/vercel_node/api/alegra6ser'),
//     };

//     const sshTunnel = new Client();

//     // Connect to SSH server
//     await new Promise((resolve, reject) => {
//       sshTunnel.on('error', reject);
//       sshTunnel.on('ready', () => {
//         console.log('SSH Tunnel is connected');
//         resolve();
//       });
//       sshTunnel.connect(sshConfig);
//     });

//     // // Once connected, create Redis client
//     // const client = redis.createClient({
//     //   socket: {
//     //     path: '/tmp/redis.sock', // Use the SSH tunnel socket path
//     //   },
//     // });

//     // // Wait for the Redis client to connect
//     // await new Promise((resolve, reject) => {
//     //   client.on('error', (err) => {
//     //     console.error('Redis client error:', err);
//     //     reject(err);
//     //   });
//     //   client.on('ready', () => {
//     //     console.log('Redis client is ready');
//     //     resolve();
//     //   });
//     // });

//     // // Fetch keys from Redis
//     // const keys = await new Promise((resolve, reject) => {
//     //   client.keys('*', (err, keys) => {
//     //     if (err) {
//     //       console.error('Error fetching keys from Redis:', err);
//     //       reject(err);
//     //     } else {
//     //       console.log('Keys fetched:', keys);
//     //       resolve(keys);
//     //     }
//     //   });
//     // });

//     // // Send keys in JSON format
//     // res.json({ keys });

//     // // Close Redis client and SSH tunnel after response is sent
//     // client.quit();





//     sshTunnel.end();
//   } catch (error) {
//     console.error('Error creating SSH tunnel or fetching Redis keys:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;







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
      // privateKey: require('fs').readFileSync('/home/controlpl/Documents/Dacs/vercel_node/api/alegra6ser'), //When working in Local
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