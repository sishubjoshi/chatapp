const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = socketio(server);

// get utils
const formatMessage = require('./utils/message');

io.on('connection', (socket) => {
	// console.log('connection established');

	// io.emit('message', formatMessage('Bot', 'Welcome to ChatApp'));
	socket.broadcast.emit('message', formatMessage('Bot', `A user has joined`));

	socket.on('chatMessage', ({ username, msg }) => {
		// console.log(msg);
		io.emit('message', formatMessage(username, msg));
	});

	socket.on('disconnect', () => {
		// console.log('out');
		io.emit('message', formatMessage('Bot', 'A user left'));
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
