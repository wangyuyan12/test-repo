'use strict'

const Router = require('koa-router')
const co = require('co')
const log4js = require('koa-log4')
const logger = log4js.getLogger('socket')
const router = new Router();

router.get('/socket/test', co.wrap(function* (ctx, next) {
	logger.debug('in /socket/test')
	ctx.websocket.send('hello world')
	ctx.websocket.on('message', (msg) => {
		logger.debug('message', msg)
	})
}))

module.exports = router 