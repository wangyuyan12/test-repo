var W3CWebSocket = require('websocket').w3cwebsocket;
 
var client = new W3CWebSocket('ws://localhost:3030/', 'echo-protocol2');
 
client.onerror = function() {
    console.log('Connection Error');
};
 
client.onopen = function() {
    console.log('WebSocket Client Connected');
 
    function sendNumber() {
        if (client.readyState === client.OPEN) {
            var number = Math.round('feifeiyu');
            client.send(number.toString());
            if(Math.random() > 0.8) {
            	console.log('close connection')
            	client.close('close connection')
            }
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
};
 
client.onclose = function() {
    console.log('echo-protocol Client Closed');
};
 
client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        console.log("Received: '" + e.data + "'");
    }
};