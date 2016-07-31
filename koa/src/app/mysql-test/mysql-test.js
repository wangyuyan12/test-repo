const mysqlDao = require('../../dao/mysql-test')
const log4js = require('koa-log4')
const logger = log4js.getLogger('mysql-test')

let GenNumber = () => {
	let date = new Date()
	let dateFormat = (tmp) => {
		return tmp < 10 ? ('0' + tmp) : (tmp)
	}
	return '"' + date.getFullYear() + date.getTime() + '"'
}

let getQueryById = (param) => {
	logger.debug('in getQueryById', param)
	return mysqlDao.queryById(param)
	// return Promise.resolve(result)
}

let insertItem = (ctx) => {
	logger.debug('in insertItem')
	// logger.debug('request', ctx.request.body)
	let param = {}
	param.number = GenNumber()
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
	return mysqlDao.insert(param)
}

const mysqlTest = {
	queryById: getQueryById,
	insertItem: insertItem,
}

module.exports = mysqlTest
