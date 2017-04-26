var socket = io();

socket.on('cconect', function(){
	console.log('connected to socket.io server');
});