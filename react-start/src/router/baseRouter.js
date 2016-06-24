'use strict'

const Router = require('koa-router')
const thrift = require('thrift')
const co = require('co')
const thunkify = require('thunkify-wrap')
const Add = require('../app/rpc-test/client.js').Add
const All = require('../app/rpc-test/client.js').All
const home_data  = require('../app/home/home_client').home_data
const Prodetail = require('../app/home/prodetail');
const enter_data = require('../app/index/enterprise/enter_auth')
const prodetail = new Prodetail().getClient();
const log4js = require('koa-log4')
const logger = log4js.getLogger('router')
const router = new Router();


router.get('/rpc-test', co.wrap( function* (ctx, next) {
	console.log('in /rpc')
	let result = yield Add(2, 3)  //调用add()方法，并获取数据
	console.log('router result', result)
	ctx.body = result
}))

router.get('/rpc-test2',  co.wrap( function* (ctx, next) {
	console.log('in /rpc2')
	let result = yield All(6, 2) //调用多个方法，获取一组数据调用多个方法，获取一组数据
	//模板渲染
	yield ctx.render('rpc-test/rpc-start', {title: 'RPC Start', data: result})
}))

router.get('/',  co.wrap( function* (ctx, next) {
	logger.info('[%s] in /', process.pid)
	let session_id = ctx.cookies.get('sessionid')

	// let result = null
	try {
		let result = yield home_data(session_id)
		logger.debug('result info', result)
		ctx.cookies.set( 'is_manage', result.login.is_manage ? 'true' : 'false' )
		ctx.cookies.set( 'nickname', encodeURI( result.login.nick || null ))
		yield ctx.render('index/home/web', {data: result, url: base_domain })
	} catch(err) {
		ctx.status = 405
		logger.debug('router get /', err)
	}
}))

router.get('/sku/sku_detail/:id',  co.wrap( function* (ctx, next) {
	let skuId = ctx.params.id;
	// 转换为可yield函数
	prodetail.get_sku_list = thunkify(prodetail.get_sku_list);
	let result = yield prodetail.get_sku_list();
	console.log(result);
	yield ctx.render('index/pro_detail/pro_detail', {data: result});
}))

router.get('/enterprise/auth', co.wrap( function* (ctx, next) {

	let user_nick = decodeURI(ctx.cookies.get('nickname'))
	let is_manage = ctx.cookies.get('is_manage') === 'true' ? true : false

	let result = yield enter_data()

	result.login = Object.assign({is_login: user_nick === 'null' ? false: true},
		{nick: user_nick} , {is_manage: is_manage} )

	logger.debug(result)

	yield ctx.render('index/enterprise/enter_auth', { data: result, url: base_domain })
}))

module.exports = router 