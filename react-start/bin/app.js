'use strict'

const koa = require('koa')
const path = require('path')
const nunjucksViews = require('koa-nunjucks-promise')
const mount = require('koa-mount')
const server = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const convert = require('koa-convert')
const log4js = require('koa-log4')
const json = require('koa-json')
const csrf = require('koa-csrf')
const co = require('co')

const finalHandler = require('../src/lib/finalHandler')
const baseRouter = require('../src/router/baseRouter')

const app = new koa()
const logger = log4js.getLogger('app')
logger.info('Step into Koa')

app.use(finalHandler())

app.use(nunjucksViews(`${path.resolve(__dirname, '..')}/src/views`, {  //模板插件
	ext: 'html',
	noCache: true,
	watch: true,
	filters: {
	    json: function(str) {
	      return JSON.stringify(str, null, 2);
	}}
}))
app.use(mount('/static', server(`${path.resolve(__dirname, '..')}/public`)))  //设置静态文件路径
// app.use(logger())  //日志
app.use(convert(json()))
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))
app.use(bodyParser()) //参数解析
app.keys = ['eayos.com']
app.use(convert(session(app))) //session
app.use(convert(csrf()))  //防csrf攻击
app.use(baseRouter.routes())
	.use(baseRouter.allowedMethods())

app.listen(listen_port)

module.exports = app