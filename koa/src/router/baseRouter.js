'use strict'

const Router = require('koa-router')
const co = require('co')
const log4js = require('koa-log4')
const logger = log4js.getLogger('router')
const router = new Router();

const tokenValidate = require('../app/wechat/token/token-validate')
const mysqlTest = require('../app/mysql-test/mysql-test')

router.get('/', co.wrap(function* (ctx, next) {
	logger.debug('in /')
	logger.debug('ctx', ctx.method)
	// logger.debug('body', ctx.session)
	// logger.debug('csrf', ctx.assertCSRF)
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

router.get('/upload', co.wrap(function* (ctx, next) {
	logger.info('in /upload')
	yield ctx.render('file-operate/index')
}))

router.get('/mysql-test/select/:id', co.wrap(function* (ctx, next) {
	logger.info('in /mysql-test/select/:id')

	let id = ctx.params.id
	let result = yield mysqlTest.queryById({id: id})
	logger.debug('result', result)
	logger.debug('result[0]', result[0].id)
	ctx.body = JSON.stringify(result)

}))
router.get('/mysql-test', co.wrap(function* (ctx, next) {
	logger.debug('in //mysql-test')
	logger.debug('ctx', ctx.method)
	logger.debug('session', ctx.session)
	yield ctx.render('mysql-test/index', {csrf: ctx.csrf})

}))
router.post('/mysql-test/insert', co.wrap(function* (ctx, next) {
	logger.info('in /mysql-test/insert/')
	logger.debug('session', ctx.session)
	let result = yield mysqlTest.insertItem(ctx)
	
	ctx.body = JSON.stringify(result)

}))
router.get('/redis-test', co.wrap(function* (ctx, next) {
	logger.debug('in /redis-test')
	logger.debug('session', ctx.session)
	
	ctx.body = ctx.session.toString()

}))


module.exports = router 