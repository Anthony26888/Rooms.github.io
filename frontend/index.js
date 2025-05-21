const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("/src/api/User.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Add custom middleware for CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(middlewares);
server.use(router);

server.listen(port);
