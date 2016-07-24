'use strict'

const crypto = require('crypto')
const log4js = require('koa-log4')
const fs = require('fs')

const logger = log4js.getLogger('tokenValidate')

let sha1 = (str) => {
	let md5sum = crypto.createHash('sha1')
	md5sum.update(str)
	str = md5sum.digest('hex')
	return str
}

let fileWrite = (paramStr) => {
	return new Promise((resolve, reject) => {
		fs.writeFile('./public/wechat/token/debugParam.txt', paramStr, function(err) {
			if(err) {
				let err = 'Failed to write debug params'
				reject(new Error(err))
			}
			resolve('ok')
		})
	})
}

let tokenValidate = (query, token) => {
	let signature = query.signature
	let echostr = query.echostr
	let timestamp = query.timestamp
	let nonce = query.nonce
	let oriArr = [
		nonce,
		timestamp,
		token  //在微信开发者中心页面里填的token
	]
	oriArr.sort()
	var original = oriArr.join('')
	let cryptoStr = sha1(original)
	if(signature === cryptoStr) {
		let paramStr = 'token' + token + '\n' + 'signature: ' + signature + '\n' + 'echostr: ' + echostr + '\n' +
			'timestamp: ' + timestamp + '\n' + 'nonce: ' + nonce + '\n'
		fileWrite(paramStr).then((resp) => {
			if(resp === 'ok') {
				logger.info('Write debug params successfully!')
			}
		}).catch((err) => {
			logger.error(err)
		})
		return echostr
	} else {
		return 'false'
	}

}

module.exports = tokenValidate
