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

		let result = co.wrap(function*() {  //获取查询结果
			try {
				let resp = yield this.mysqlDao.queryById(param)
				logger.debug('in queryById yield', resp)
				return resp
			} catch(err) {
				logger.error(err)
			}
		})

		//采用以下写法可以防止栈溢出的情形
		return Promise.resolve().then(() => result)
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
}


module.exports = MysqlTest
