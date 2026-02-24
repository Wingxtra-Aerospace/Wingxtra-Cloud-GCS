const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Quick status endpoint so opening the proxy URL doesn't immediately proxy upstream
app.get("/", (req, res) => {
  res.status(200).send("Wingxtra proxy is running. Try /h/health or /w/wl/");
});

// CORS for your Render UI
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});

// IMPORTANT: use HTTP upstream for port 19408
const TARGET = "http://airgap.droneengage.com:19408";

app.use(
  "/",
  createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
    ws: true,
    secure: false,
    logLevel: "debug",
    onProxyReq: (proxyReq) => {
      // Rewrite Origin/Host (some upstreams are strict)
      proxyReq.setHeader("Origin", "https://airgap.droneengage.com");
      proxyReq.setHeader("Referer", "https://airgap.droneengage.com/");
      proxyReq.setHeader("Host", "airgap.droneengage.com:19408");
    },
    onProxyReqWs: (proxyReq) => {
      proxyReq.setHeader("Origin", "https://airgap.droneengage.com");
      proxyReq.setHeader("Host", "airgap.droneengage.com:19408");
    }
  })
);

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Proxy listening on ${port}, target=${TARGET}`));
