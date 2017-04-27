var socket = io();

socket.on('connect', function(){
	console.log('connected to client side!');
});

socket.on('message', function(message){
	console.log('New Message');
	console.log(message.text);
});

socket.emit('message',{
	text: 'Client is here!'
})