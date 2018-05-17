const app = require('http').createServer();
const io = require('socket.io')(app);
const SocketManager = require('./SocketManager');

const PORT = process.env.PORT || 3500;

io.on('connect', SocketManager);

app.listen(PORT, () => {
    console.log('Connect to PORT:' + PORT);
});

module.exports.io = io;
