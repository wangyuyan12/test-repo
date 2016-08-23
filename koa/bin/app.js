'use strict'
require('./log')
require('../config/dev.env.config')
if( process.env.NODE_ENV === 'test' ) {
	require('../config/test.env.config')
} else if( process.env.NODE_ENV === 'production' ) {
	require('../config/prod.env.config')
}
const koa = require('koa')
const path = require('path')
const nunjucksViews = require('koa-nunjucks-promise')
const mount = require('koa-mount')
const server = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session2')
const convert = require('koa-convert')
const log4js = require('koa-log4')
// const json = require('koa-json')
const csrf = require('koa-csrf')
const co = require('co')

const finalHandler = require('../src/lib/finalHandler')
const baseRouter = require('../src/router/baseRouter')
const sessionStore = require('../src/lib/session-store')

const app = new koa()
const logger = log4js.getLogger('app')
logger.info('-------Step into Koa-------------')

app.use(finalHandler())

app.use(nunjucksViews(`${path.resolve(__dirname, '..')}/src/views`, {  //模板插件
	ext: 'html',
	noCache: process.env.NODE_ENV === 'development',
	watch: process.env.NODE_ENV === 'development',
	filters: {
	    json: function(str) {
	      return JSON.stringify(str, null, 2);
	}},
	globals: {  //设置对于nunjucks的全局变量
		staticPath: '/static'
	}
}))
app.use(mount('/static', server(`${path.resolve(__dirname, '..')}/public`)))  //设置静态文件路径
// 记录所有http请求
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))
app.use(bodyParser()) //参数解析
// app.keys = ['feifeiyu.com']
app.use(session({ //采用至此koa2 的 koa-session2
	key: 'feifeiyu',
	// store: new sessionStore(),
	maxAge: 3600000, //失效时间
})) //session

app.use(convert(csrf()))  //防csrf攻击
app.use(co.wrap(function* (ctx, next) {
	//将csrf token打入cookie
	if(ctx.method === 'GET') {
		// let cookieExp = new Date()
		// cookieExp.setHours(cookieExp.getHours() + 2)
		ctx.cookies.set('csrfnode', ctx.csrf, 
			{/*expires: cookieExp,*/ httpOnly: false})
		//cookie httpOnly 要设置成false, 否则浏览器端 document.cookie无法读取
	}
	
	yield next()
}))
app.use(baseRouter.routes())
	.use(baseRouter.allowedMethods())

app.listen(listen_port)
logger.info('[worker:%s] web server start listen on %s', process.pid, listen_port)
module.exports = app