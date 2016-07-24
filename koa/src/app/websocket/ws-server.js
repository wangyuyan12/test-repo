'use strict'

/*const webSocketServer = require('ws').Server
const wss = new webSocketServer({port: 3030})

wss.on('connection', (ws) => {
	ws.on('message')
})
*/
const webSocketServer = require('websocket').server 
const http = require('http')

var server = http.createServer((request, response) => {
	console.log((new Date()) + 'Received request for ' + request.url)
	response.writeHead(404)
	response.end()
})

server.listen(3030, () => {
	 console.log((new Date()) + ' Server is listening on port 3030')
})

let wsServer = new webSocketServer({
	httpServer: server,
	autoAcceptConnections: false
})

let originIsAllowed = (origin) => {
	return true
}

wsServer.on('request', (request) => {
	if(!originIsAllowed(request.origin)) {
		request.reject()
		console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
     	return
	}

	var connection1 = request.accept('echo-protocol1', request.origin)
	console.log((new Date()) + ' Connection1 accepted.')
	connection1.on('message', (message) => {
		console.log((new Date()) + 'connection1.on(message)')
		if(message.type === 'utf8') {
			console.log('Received Message: ' + message.utf8Data)
			connection1.sendUTF(message.utf8Data)
		} else if(message.type === 'binary') {
			console.log('Received Binary Message of ' + message.binaryData.length + ' bytes')
			connection1.sendBytes(message.binaryData)
		}
	})
	connection1.on('close', function(reasonCode, description) {
		console.log((new Date()) + 'connection1.on(close)')
        console.log((new Date()) + ' Peer ' + connection1.remoteAddress + ' disconnected.');
    })

    var connection2 = request.accept('echo-protocol2', request.origin)
	console.log((new Date()) + ' Connection2 accepted.')
	connection2.on('message', (message) => {
		console.log((new Date()) + 'connection2.on(message)')
		if(message.type === 'utf8') {
			console.log('Received Message: ' + message.utf8Data)
			connection2.sendUTF(message.utf8Data)
		} else if(message.type === 'binary') {
			console.log('Received Binary Message of ' + message.binaryData.length + ' bytes')
			connection2.sendBytes(message.binaryData)
		}
	})
	connection2.on('close', function(reasonCode, description) {
		console.log((new Date()) + 'connection.on(close)')
        console.log((new Date()) + ' Peer ' + connection2.remoteAddress + ' disconnected.');
    })
})