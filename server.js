var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
	
app.use(express.static(__dirname + '/public'));

var clientInfo={};

	
io.on('connection', function(socket){
	console.log('user connected via socket.io');
        
        socket.on('disconnect',function(){
        	var userData = clientInfo[socket.id];
        	if(clientInfo[socket.id] !== 'undefined'){
        		socket.leave(userData.room);
        		io.to(userData.room).emit('message',{
        			name: 'System',
        			text: userData.name + ' has Left',
        			timestamp: moment().valueOf()
        		});
        		delete clientInfo[socket.id];
        	}
        });
        socket.on('joinRoom',function(req){
            clientInfo[socket.id] = req; 
            socket.join(req.room); 
            socket.broadcast.to(req.room).emit('message',{
                name: 'System',
                text: req.name + ' has joined!'
            });
        });
	socket.on('message',function(message){
		console.log('Message Received: '+message.text);

		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message',message); //send to all including self
				//OR
		//socket.broadcast.emit('message',message); //broadcast to all but not self
	});
	socket.emit('message',{
		name: 'System',
		text: 'Welcome to the chat application',
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function(){
	console.log('server started');
});