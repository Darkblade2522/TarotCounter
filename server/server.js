console.log('Hello World Server!');

//Routes
//Si "/" envoyer index.html
//Si "/public" envoyer le fichier correspondant


function getStringTime(){
	return (new Date()).toLocaleTimeString();
}


/*=========================
===== Serveur ressources statiques
============================ */
var express = require('express');
var ressourcesApp = express();

ressourcesApp
	//.use(express.logger()) // Active le middleware de logging
	.use(express.static( __dirname + '/../public')) // Indique que le dossier /public contient des fichiers statiques
	.use(express.favicon(__dirname + '/../public/favicon.ico')) // Active la favicon indiquée
	.use(function(req, res){
			//TODO 404
			res.send('Hello ');
		});

ressourcesApp.listen(3000);



/*=========================
===== Serveur socket.io
============================ */
//=> Pur socket.io, sur un port différent

var players = [];

var socketApp = express();
var server = require('http').createServer(socketApp);
var io = require('socket.io').listen(server);
var fs = require('fs');
var model = require('./model.js');

io.sockets.on('connection', function (socket) {
	console.log("["+ getStringTime() +"] New connection!");
	
	//Send players list on connection
	var players = model.getPlayers(function(players){
		socket.emit('list_players', players);
	});
	
    socket.on('new_player', function(pseudo) {
    	console.log("Received new player...");
       	model.addPlayer(pseudo);
        socket.emit('new_player', pseudo); 				//Send to sender
        socket.broadcast.emit('new_player', pseudo);	//Broadcast to everyone else
    });

});

server.listen(3001);

//TODO Ptite auth avec mdp