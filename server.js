const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
	// console.log('connection established');
	socket.broadcast.emit('message', 'A user has joined..');

	socket.on('chatMessage', (msg) => {
		// console.log(msg);
		io.emit('message', msg);
	});

	socket.on('disconnect', () => {
		// console.log('out');
		io.emit('message', 'A user left');
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
