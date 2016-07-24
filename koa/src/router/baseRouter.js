'use strict'

const Router = require('koa-router')
const co = require('co')
const log4js = require('koa-log4')
const logger = log4js.getLogger('router')
const router = new Router();

const tokenValidate = require('../app/wechat/token/token-validate')

router.get('/', co.wrap(function* (ctx, next) {
	logger.debug('in /')
	ctx.body = 'hello feifeiyu ok'
}))

router.get('/wechat/token', co.wrap(function* (ctx, next) {
	logger.debug('in /wechat/token')
	logger.debug('query param', ctx.query)
	let token = 'feifeiyu'
	let result = tokenValidate(ctx.query, token)
	ctx.body = result
}))

router.get('/wechat/test', co.wrap(function* (ctx, next) {
	logger.debug('in /wechat/test')
	yield ctx.render('wechatT/index')

}))

router.get('/poster', co.wrap(function* (ctx, next) {
	logger.info('in /poster')
	yield ctx.render('poster/index')
}))
module.exports = router 