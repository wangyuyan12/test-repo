'use strict'
const log4js = require('koa-log4')
const logger = log4js.getLogger('dao')
const mysqlPool = require('../lib/mysql-connection')

class MysqlTestDao {
	constructor() {	}

	queryById(param) {
		return new Promise ((resolve, reject) => {
			mysqlPool().then((conn) => {
				let sql = 'select * from kuaijie.purchase_order where id = ' + param.id
				conn.query(sql, (err, result) => {
					conn.release()
					if(err) {
						reject(err)
					}
					resolve(result)
				})
			}).catch((err) => {
				console.log('err', err)
			})
		})
	}

	insert(param) {
		logger.debug('in insert')
		return new Promise((resolve, reject) => {
			mysqlPool().then((conn) => {
				let sql = 'insert into kuaijie.purchase_order ' 
				 + '(number, total, deposit, remain, create_time, order_state, company_id, shop_id, auth_num) ' 
				 + 'values '
				 + '(' + param.number + ', ' + param.total + ', ' + param.deposit + ', '
				 + param.remain + ', now(), ' + param.orderState + ', '
				 + param.companyId + ', ' + param.shopId + ', ' + param.authNum + ');'
				 logger.debug('sql', sql)
				 conn.query(sql, (err, result) => {
				 	conn.release()
				 	if(err) {
				 		reject(err)
				 	}
				 	resolve(result)
				 })
			}).catch((err) => {
				console.log('err', err)
			})
		})
	}
}

module.exports = MysqlTestDao