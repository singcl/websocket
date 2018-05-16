const app = require('http').createServer();
const io = module.exports.io = require('socket.io')(app);

const PORT = process.env.PORT || 3500;

const SocketManager = require('./SocketManger');

io.on('connect', SocketManager);

app.listen(PORT, function() {
    console.log('Connect to PORT:' + PORT);
})
