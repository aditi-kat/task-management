require("dotenv").config();
const client = require("prom-client");

const app = require("./src/app/app"); // Now app is available
const http = require("http");
const databaseConnection = require("./src/db/database");

databaseConnection();

// 🔧 Prometheus metrics

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
