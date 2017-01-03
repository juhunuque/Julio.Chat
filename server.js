"use strict";

var http = require("http");
var express = require("express");
var socketIo = require("socket.io");

const app = express();
app.set("view engine", "jade");

app.use(express.static("./public"));

app.get("/", (request, response)=>{
	response.end("Welcome to the chat room. Please, go to /home");
});

app.get("/home", (request, response)=>{
	response.render("index", {title: "Julio.Chat"});
});

const server = new http.Server(app);
const io = socketIo(server);

io.on("connection", (socket)=>{
	console.log("Client connected!");

// Receive all the incoming events of the type "chat:add", and then, perform different actions
	socket.on("chat:add", data => {
		io.emit("chat:added", data); // Pass the message to all the clients
	});

	socket.on("disconnect", ()=>{
		console.log("Socket disconected");
	});
});

const port = process.env.PORT || 3000;;
server.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});
