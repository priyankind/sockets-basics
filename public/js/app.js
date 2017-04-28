/*var name = getQueryVariable('name');
var room = getQueryVariable('room');*/

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    
    return undefined;
}

var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

var socket = io();

socket.on('connect', function(){
	console.log('connected to client side!');
});

socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	var $message = jQuery('.messages');
	console.log('New Message is here on app.js!');
	console.log(message.text);

	$message.append('<p><strong>'+message.name+' '+momentTimestamp.local().format('h:mma')+'</strong></p>');
	$message.append('<p>'+message.text+'</p');
});

/*socket.emit('message',{
	text: 'Client is here!'
})*/

var $form = jQuery('#message-form');

$form.on('submit',function(event){
	event.preventDefault();
	var $message = $form.find('input[name=message]');
	socket.emit('message',{
		name: name,  
		text: $message.val()
	});
	$message.val('');
	
});