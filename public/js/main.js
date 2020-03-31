const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const { username } = Qs.parse(location.search, {
	ignoreQueryPrefix: true
});
console.log(username);

// document.querySelector('.chat-header').innerHTML = `username: ${username}`;

chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const msg = e.target.elements.msg.value;

	console.log(msg);
	socket.emit('chatMessage', { username, msg });

	e.target.elements.msg.value = '';
	e.target.elements.msg.focus();
});

socket.on('message', (msg) => {
	// console.log(msg);
	displayMessage(msg);
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

function displayMessage(msg) {
	const div = document.createElement('div');
	div.classList.add('message');

	div.innerHTML = `
    <p class="meta"><b>${msg.username}</b> <span>${msg.time}</span></p>
    <p class="text">
        ${msg.text}
    </p>`;

	chatMessages.appendChild(div);

	// document.querySelector('.chat-mess')
}
