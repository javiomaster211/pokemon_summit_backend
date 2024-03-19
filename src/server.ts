// Imports
import dbConnection from './config/database.config';
import https from 'https';
import app from './app';
import fs from 'fs';

// Load .dotenv file
require('dotenv').config();

// Server port
const PORT = process.env.SERVER_PORT || 7000;

// Load SSH certs for HTTPS
var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert,
};

// Instance HTTPS server that offers the express app
const server = https.createServer(options, app);

/**
 * Launch server function.
 * Awaits for important connections to be finished before it starts listening to requests
 */
async function startServer() {
  await dbConnection();
  server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

startServer();
