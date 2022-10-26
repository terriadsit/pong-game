let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of('/pong') // choose pong namespace
  pongNamespace.on('connection', socket => {
    console.log('a user connected', socket.id)
    let room = 'room' + Math.floor(readyPlayerCount / 2) // create rooms for sets of 2 players
    
    socket.on('ready', () => {
     
      socket.join(room);

      console.log('player ready', socket.id, room)
      readyPlayerCount++
      console.log('playercount', readyPlayerCount)
      if (readyPlayerCount % 2 === 0) {
        pongNamespace.in(room).emit('startGame', socket.id) // 2nd player will be referee, track ball
      }
    })

    socket.on('paddleMove', paddleData => {
      socket.to(room).emit('paddleMove', paddleData) // forward to other player paddlePosition
    })

    socket.on('ballMove', ballData => {
      //console.log('balldata', ballData)
      socket.to(room).emit('ballMove', ballData) // send to none referee player
    })

    socket.on('disconnect', reason => {
      console.log('Client', socket.id, ' disconnected: ', reason);
      socket.leave(room);  // rooms should not be perpetual, this is default behavior, just being explicit
    })
  })
}

module.exports = {
    listen,
}
