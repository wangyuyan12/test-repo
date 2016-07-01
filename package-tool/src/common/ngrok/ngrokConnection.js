'use strict'

const ngrok = require('ngrok')

let ngrokConnection = (token, port, proto) => {
	ngrok.authtoken(token, (err, token) => {
		if(err) {
			console.log('ngrok auth failed')
			return
		}
		console.log('ngrok token', token)
	})

	let options = {
		proto: proto || 'http',
		addr: port,
	}

	return new Promise((resolve, reject) => {
		ngrok.connect( options, (err, url) => {
			if(err) {
				reject(err)
			}
			resolve(url)
		})
	})
}

module.exports = ngrokConnection