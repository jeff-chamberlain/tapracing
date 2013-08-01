#!/usr/local/bin/node

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app, {log: false}),
    fs = require('fs');

app.listen(5000);

function handler(req, res){
    var url = req.url;

    if (url == '/') {
        fs.readFile(__dirname + '/player.html', function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(500);
                return res.end('Error loading player.html');
            }

            res.writeHead(200);
            res.end(data);
        });
    }
    else if (url == '/game') {
        fs.readFile(__dirname + '/game.html', function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
    }
}

// assuming io is the Socket.IO server object
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// Proxy Player Events to the Game Client.
var players = io.of('/player').on('connection', function(socket) {

    // players must send an explicit 'join' message - nothing happens on connection.

    socket.on('msg', function(msg) {
        msg.playerid = socket.id;
        game.emit('msg', msg);
    });

    socket.on('disconnect', function() {
        game.emit('msg', {event: 'leave', playerid: socket.id});
    });
});

// Proxy Game Events to the Player Clients.
var game = io.of('/game').on('connection', function(socket) {
    
    socket.on('msg', function(msg) {
        
        players.emit('msg', msg);
    
    });
});
