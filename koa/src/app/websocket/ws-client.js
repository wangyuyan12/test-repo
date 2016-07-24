'use strict'
/*
const webSocketClient = require('websocket').client 

let client = new webSocketClient()

client.on('connectFailed', (error) => {
    console.log('Connect Error: ' + error.toString())
})

client.on('connect', (connection) => {
	connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString())
    })
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed')
    })
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'")
        }
    })
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF)
            connection.sendUTF(number.toString())
            if(Math.random() > 0.8) {
            	console.log('close connection')
            	connection.close('close connection')
            }
            setTimeout(sendNumber, 1000)
        }
    }
    sendNumber()
} )

client.connect('ws://localhost:3000/', 'echo-protocol')*/


var W3CWebSocket = require('websocket').w3cwebsocket;
 
var client = new W3CWebSocket('ws://localhost:3030/', 'echo-protocol1');
 
client.onerror = function() {
    console.log('Connection Error');
};
 
client.onopen = function() {
    console.log('WebSocket Client Connected');
 
    function sendNumber() {
        if (client.readyState === client.OPEN) {
            var number = Math.round(Math.random() * 0xFFFFFF);
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