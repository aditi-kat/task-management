const express = require("express");
const client = require("prom-client"); // Add this

const app = express();
const middleware = require("../middleware/devMiddleware");
const routes = require("../router");
const globalController = require("../controllers/global.controller");

// 👉 Collect default system metrics
client.collectDefaultMetrics();

// 👉 Add /metrics route before other routes
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.use([middleware, routes]);

app.use(globalController.notFoundHandler);
app.use(globalController.errorHandler);

module.exports = app;
