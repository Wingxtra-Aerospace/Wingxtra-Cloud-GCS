const express = require('express');
const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');

const TARGET = 'https://airgap.droneengage.com:19408';
const ALLOWED_ORIGIN = 'https://wingxtra-cloud-gcs.onrender.com';
const PORT = process.env.PORT || 3000;

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  return next();
});

const proxyMiddleware = createProxyMiddleware({
  target: TARGET,
  changeOrigin: true,
  ws: true,
  secure: true,
  xfwd: true,
  logLevel: 'warn',
});

app.use('/', proxyMiddleware);

const server = http.createServer(app);
server.on('upgrade', proxyMiddleware.upgrade);

server.listen(PORT, () => {
  console.log(`[proxy] listening on :${PORT}, forwarding to ${TARGET}`);
});
