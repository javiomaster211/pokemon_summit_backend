import dbConnection from './config/database.config';
import https from 'https';
import app from './app';
import fs from 'fs';

require('dotenv').config();
const PORT = process.env.SERVER_PORT || 7000;

var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert,
};

const server = https.createServer(options, app);

async function startServer() {
  await dbConnection();
  server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

startServer();
