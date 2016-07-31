'use strict'

const redis = require('ioredis')
const uid = require('uid-safe')
const log4js = require('koa-log4')

const redisConn = require('./redis-connection')
const logger = log4js.getLogger('session')


class SessionStore {
	constructor() {
		this.redis = null
		redisConn().then(resp => {this.redis = resp})
			.catch((err) => {
					logger.error('init', err)
				})
	}

	getId(length) {
		return uid.sync(length)
	}

	get(sid) {
		return this.redis.get(`session-${sid}`).then((resp) => {
			try {
				return Promise.resolve(JSON.parse(resp))
			} catch(e) {
				return Promise.resolve({})
			}
		})
	}
	
	set(session, opts) {
		if(!opts.sid) {
			opts.sid = this.getId(24)
		}
		//存入redis要将对象转成JSON字符串
		return this.redis.set(`session-${opts.sid}`, JSON.stringify(session)).then(() => {
			return Promise.resolve(opts.sid)
		})
	}

	destroy(sid) {
		return this.redis.del(`session-${sid}`)
	}
}

module.exports = SessionStore