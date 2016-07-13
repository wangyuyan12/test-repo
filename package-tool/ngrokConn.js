'use strict'

const ngrok = require('ngrok')
const colors = require('colors/safe')

const ngrokConfig = require('./package.config').ngrokConfig

let port = ngrokConfig.port
let proto = ngrokConfig.proto
let token = ngrokConfig.token
let subDomain = ngrokConfig.subDomain


let options = {
	proto: proto,
	addr: port,
	subdomain: subDomain,
	authtoken: token,
}

ngrok.authtoken(token, (err, token) => {
	if(err) {
		console.log(colors.bgRed.bold('ngrok auth failed'))
		console.log(colors.red(err))
		return
	}
	// console.log(colors.inverse('ngrok token', token))
})

ngrok.connect( options, (err, url) => {
	if(err) {
		console.log(colors.bgRed.bold('Failed to create connection'))
		console.log(err)
	} else {
		console.log(colors.yellow.bold.bgCyan(url + ' -> localhost:' + port))
	}
	
})


