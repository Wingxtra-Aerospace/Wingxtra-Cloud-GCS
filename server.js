const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const certPath = process.env.WEB_SSL_CRT || './ssl/localssl.crt';
const keyPath = process.env.WEB_SSL_KEY || './ssl/localssl.key';
const useHttps = process.env.USE_HTTPS === 'true';

if (useHttps && fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  const sslOptions = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
  };

  https.createServer(sslOptions, app).listen(port, () => {
    console.log(`HTTPS server running on port ${port}`);
  });
} else {
  http.createServer(app).listen(port, () => {
    console.log(`HTTP server running on port ${port}`);
  });
}

