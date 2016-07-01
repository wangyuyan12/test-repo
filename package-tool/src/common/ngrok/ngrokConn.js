'use strict'

const ngrok = require('ngrok')

let token = '68NcTtewq6VKaa7eiW5en_239XjYofPtNBEPKPRT8nJ'
let port = 3000

ngrok.authtoken(token, (err, token) => {
	if(err) {
		console.log('ngrok auth failed')
		return
	}
	console.log('ngrok token', token)
})

ngrok.connect(port, (err, url) => {
	if(err) {
		console.log('Failed to create connection')
	}
	console.log(url + ' -> localhost:' + port)
})


