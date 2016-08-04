'use strict'

const Router = require('koa-router')
const co = require('co')
const log4js = require('koa-log4')
const logger = log4js.getLogger('router')
const path = require('path')
const parse = require('co-busboy')
const fs = require('fs')
const uid = require('uid-safe')
const router = new Router();


const tokenValidate = require('../app/wechat/token/token-validate')
const MysqlTest = require('../app/mysql-test/mysql-test')
const ImgCompress = require('../app/img-compress/img-comp')

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
	let mysqlTest = new MysqlTest()
	let result = yield mysqlTest.queryById({id: id})

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
	let mysqlTest = new MysqlTest()
	let result = yield mysqlTest.insertItem(ctx)
	result.status = 200
	ctx.body = result

}))
router.get('/redis-test', co.wrap(function* (ctx, next) {
	logger.debug('in /redis-test')
	logger.debug('session', ctx.session)
	logger.debug('dir', path.resolve(__dirname, '../..'))
	ctx.body = ctx.session.toString()

}))

router.get('/upload/img', co.wrap(function* (ctx, next) {
	logger.debug('in /upload/img /get')
	yield ctx.render('upload/index', { csrfnode: ctx.csrf })
}))

router.post('/upload/img', co.wrap(function* (ctx, next) {
	logger.debug('in /upload/img')
	
	let parts = parse(ctx)
	let part = null
	let imgComp = new ImgCompress()
	let imgPath = path.join(path.resolve(__dirname, '../..'), 'public', 'upload')

	let result = []
	while(part = yield parts) {
		try {
			part.filename = uid.sync(15) + /\.jpg|\.png/.exec(part.filename)[0]
			let stream = fs.createWriteStream(path.join(imgPath, part.filename))
			// logger.debug('part', part.pipe)
			part.pipe(stream)
			imgComp.imgCompTo(stream.path, stream.path).then(res => {
				logger.debug('ok?', res)
			})
			
			logger.debug('uploading %s -> %s', part.filename, stream.path)
			result.push({path: '/static/upload/'+part.filename})
		} catch(err) {
			logger.error(err)
		}
	}

	ctx.body = JSON.stringify(result)

}))


module.exports = router 