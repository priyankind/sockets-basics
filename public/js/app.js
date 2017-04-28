var socket = io();

socket.on('connect', function(){
	console.log('connected to client side!');
});

socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);

	console.log('New Message is here on app.js!');
	console.log(message.text);

	jQuery('.messages').append('<p><strong>'+momentTimestamp.local().format('h:mma')+': '+'</strong>'+message.text+'</p>');
});

/*socket.emit('message',{
	text: 'Client is here!'
})*/

var $form = jQuery('#message-form');

$form.on('submit',function(event){
	event.preventDefault();
	var $message = $form.find('input[name=message]');
	socket.emit('message',{
		text: $message.val()
	});
	$message.val('');
	
});