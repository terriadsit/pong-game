// server is running express and socket.io side by side
const http = require('http');
const io = require('socket.io');


const apiServer = require('./api'); // the express handler
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

const sockets = require('./sockets');

const PORT = 3000;
httpServer.listen(PORT);
console.log(`listening on port ${PORT}`);

sockets.listen(socketServer);

