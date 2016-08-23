const co = require('co')
const log4js = require('koa-log4')
const logger = log4js.getLogger('mysql-test')
const MysqlTestDao = require('../../dao/mysql-test')

class MysqlTest {
	constructor() {
		this.mysqlDao = new MysqlTestDao()
	}

	GenNumber() {
		let date = new Date()
		let dateFormat = (tmp) => {
			return tmp < 10 ? ('0' + tmp) : (tmp)
		}
		return '"' + date.getFullYear() + date.getTime() + '"'
	}

	queryById(param){
		logger.debug('in QueryById', param)

		/*let result = co.wrap(function*() {  //获取查询结果
			try {
				let resp = yield this.mysqlDao.queryById(param)
				logger.debug('in queryById yield', resp)
				return resp
			} catch(err) {
				logger.error(err)
			}
		})*/

		//采用以下写法可以防止栈溢出的情形
		// return Promise.resolve().then(() => result)
		return this.mysqlDao.queryById(param)
	}

	insertItem(ctx){
		logger.debug('in insertItem')
		// logger.debug('request', ctx.request.body)
		let param = {}
		param.number = this.GenNumber()
		param.total = parseFloat(ctx.request.body.total)
		param.deposit = parseFloat(ctx.request.body.deposit)
		param.remain = param.total - param.deposit
		param.orderState = ctx.request.body.orderState
		param.companyId = ctx.request.body.companyId
		param.shopId = ctx.request.body.shopId
		param.authNum = ctx.request.body.authNum
		if(param.payTime) {
			param.payTime = '\'' + param.payTime + '\''
		}
		logger.debug('param', param)

		return this.mysqlDao.insert(param)
	}

	updateOrderState(ctx, id) {
		logger.debug('in updateItem')
		let param = {}
		param.order_state = ctx.request.body.orderState
		return this.mysqlDao.updateById(param, id)
	}

	loginOperate(ctx) {
		logger.debug('in loginOperate')
		let param = {}
		param.account = ctx.request.body.account
		param.password = ctx.request.body.password
		let $this = this
		return co(function* () {
			let result = yield $this.mysqlDao.userQuery(param)
			logger.debug('result', result)
			if(result[0] && result[0].account === param.account) {
				ctx.session.account = result[0].account
				ctx.session.role = 'admin'
				logger.debug('session', ctx.session)
				return Promise.resolve().then(() => true)
			} 
			return Promise.resolve().then(() => false)
		})
		// return this.mysqlDao.userQuery(param)
	}
}


module.exports = MysqlTest
