'use strict'
const log4js = require('koa-log4')
const logger = log4js.getLogger('dao')
const mysqlPool = require('../lib/mysql-connection')

class MysqlTestDao {
	constructor() {	}

	userQuery(param) {
		return new Promise((resolve, reject) => {
			mysqlPool().then((conn) => {
				let keys = Object.keys(param)
				let sql = 'select * from kuaijie.user where '
				keys.map((item, index) => {
					if(index === 0) {
						if(typeof param[item] === 'number')
							sql += item + '=' + param[item] + '\ '
						else 
							sql += item + '=\'' + param[item] + '\' \ '
					} else {
						if(typeof param[item] === 'number')
							sql +='and\ ' + item + '=' + param[item] + '\ '
						else 
							sql +='and\ ' + item + '=\'' + param[item] + '\' \ '
					}
				})
				sql = sql.trim().concat(';')
				logger.debug('sql', sql)
				conn.query(sql, (err, result) => {
					conn.release()
					if(err) {
						reject(err)
					}
					resolve(result)
				})
			}).catch((err) => {
				logger.error('err', err)
				reject(err)
			})
		})
	}

	queryById(param) {
		return new Promise ((resolve, reject) => {
			mysqlPool().then((conn) => {
				let sql = 'select * from kuaijie.purchase_order where id = ' + param.id
				logger.debug('sql', sql)
				conn.query(sql, (err, result) => {
					conn.release()  //一定记得释放
					if(err) {
						reject(err)
					}
					resolve(result)
				})
			}).catch((err) => {
				console.log('err', err)
				reject(err)
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
				 	conn.release() //一定记得释放
				 	if(err) {
				 		reject(err)
				 	}
				 	resolve(result)
				 })
			}).catch((err) => {
				console.log('err', err)
				reject(err)
			})
		})
	}

	updateById(param, id) {
		logger.debug('in update')
		return new Promise((resolve, reject) => {
			mysqlPool().then((conn) => {
				let keys = Object.keys(param)
				let sql = 'update kuaijie.purchase_order set\ '
				keys.map(item => {
					sql += item + '=' + param[item] + '\ '
				})
				
				sql += 'where id=' + id + ';'
				console.log('sql', sql)
				conn.query(sql, (err, result) => {
					conn.release() //释放
					if(err) reject(err)
					resolve(result)
				})
			}).catch(err => {
				reject(err)
			})
		})
	}
}

module.exports = MysqlTestDao