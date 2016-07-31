'use strict'

const ioredis = require('ioredis')

let redisConfig = require('../../config/dev.env.config').redisConfig

if( process.env.NODE_ENV === 'test' ) {
	const redisConfig = require('../../config/test.env.config').redisConfig
} else if( process.env.NODE_ENV === 'production' ) {
	const redisConfig = require('../../config/prod.env.config').redisConfig
}

let clientCreate = (config, callback_) => {
	let redis = new ioredis(config)
	redis.on('connect', () => { 
		callback_(null, redis) //链接成功
	})

	redis.on('error', (err) => {
		callback_(err, null)  //捕捉异常
	})

}

let redisConn = () => {
	return new Promise((resolve, reject) => {
		clientCreate(redisConfig, (err, conn) => {
			if(err) {
				reject(err)
			}
			resolve(conn)
		})
	})
}

module.exports = redisConn