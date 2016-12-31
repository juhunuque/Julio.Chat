"use strict";

const username = prompt("Welcome to Julio.Chat.\nYou will be known as:");
const socket = io();

/*
 * In the browser we use socket.emit in order to send to the server, it's the opposite of socket.on, that is used to create handlers in the server
*/
// socket.emit("chat:add", {
// 	message:"blegh"
// });


const chatInput = document.querySelector(".chat-form input[type=text]");

/*
	* It's just triggered when the Enter key is pressed
*/
chatInput.addEventListener("keypress", event => {
	if(event.keyCode !== 13){
		return;
	}

	event.preventDefault();

	const text= event.target.value.trim();
	if(text.length === 0){
		return;
	}

	socket.emit("chat:add", {
		username: username,
		message: text
	});

	event.target.value = "";
});

const chatList = document.querySelector(".chat-list ul");

/*
* Read all the events emited by the server with the type "chat:added", and creates a list element to simulate a chat
*/
socket.on("chat:added", data => {
	const messageElement = document.createElement("li");
	messageElement.innerText = `${data.username} says => ${data.message}`;
	chatList.appendChild(messageElement);
	chatList.scrollTop = chatList.scrollHeight;
});
