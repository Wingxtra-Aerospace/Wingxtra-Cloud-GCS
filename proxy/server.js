// proxy/server.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Allow your webclient origin (add your future gcs.wingxtra.com too)
const ALLOWED_ORIGINS = new Set([
  "https://wingxtra-cloud-gcs.onrender.com",
  // "https://gcs.wingxtra.com",
]);

// CORS middleware (handles preflight + normal responses)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

// IMPORTANT: Upstream is HTTP, not HTTPS (common for port 19408)
const TARGET = "http://airgap.droneengage.com:19408";

// Proxy configuration (includes websocket upgrade)
const proxy = createProxyMiddleware({
  target: TARGET,
  changeOrigin: true,
  ws: true,
  secure: false, // doesn't matter for http target; keeps it tolerant if you switch targets
  logLevel: "debug",

  // Some upstreams reject unknown Origin/Host; rewrite to something acceptable
  onProxyReq: (proxyReq, req, res) => {
    // Remove browser origin and set a "safe" origin/host.
    // If airgap expects a specific origin, set it here.
    proxyReq.setHeader("Origin", "https://airgap.droneengage.com");
    proxyReq.setHeader("Referer", "https://airgap.droneengage.com/");
    proxyReq.setHeader("Host", "airgap.droneengage.com:19408");
  },

  onProxyReqWs: (proxyReq, req, socket, options, head) => {
    proxyReq.setHeader("Origin", "https://airgap.droneengage.com");
    proxyReq.setHeader("Host", "airgap.droneengage.com:19408");
  },
});

app.use("/", proxy);

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Wingxtra Airgap Proxy running on port ${port}`);
  console.log(`Proxying to: ${TARGET}`);
});
