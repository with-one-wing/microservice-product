const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3002;
console.log('process.env', process.env);
const server = http.createServer(app);
server.listen(port);
