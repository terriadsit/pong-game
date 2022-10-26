const server = require('http').createServer();

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

const PORT = 3000;

server.listen(PORT);
console.log(`listening on port ${PORT}`);

let readyPlayerCount = 0;

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('ready', () => {
        console.log('player ready', socket.id);
        readyPlayerCount++;
        console.log('playercount', readyPlayerCount);
        if (readyPlayerCount === 2) {
            io.emit('startGame', socket.id); // 2nd player will be referee
        }

    })
});