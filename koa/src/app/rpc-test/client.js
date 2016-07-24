'use strict'

const thrift = require('thrift')
const Cal = require('./Cal.js')
const log4js = require('koa-log4')
const entry_types = require('../../../thrift/lib/gen-nodejs/entry_types')
// const rpcConfig = require('../../../bin/config').rpcConfig

//定义端口号,应对多端口
const host = rpc_config.get('home')[0]
const port = rpc_config.get('home')[1]
const logger = log4js.getLogger('rpc-test')

//建立rpc链接
let connection = (port) => {
	const conn = thrift.createConnection(host, port)
	conn.on('error', (err) => {
		console.log(err)
		logger.error(err)
	})
	return conn
}

//调用add方法，获取数据
const Add = (num1, num2) => {
	console.log('in client/Add')
	let conn = connection(port)
	const Calculator = new Cal(conn)
	let result

	return Calculator.add(num1, num2).then((resp) => {
		result = resp
		return result
	}).catch((err) => {
		result = err
		return result
	})
}


let get_resp = (func) => {
	try {
		let resp = func.then((resp) => ( resp ))
				.catch((err) => { throw new Error( err )})
		return Promise.resolve(resp) //重新封装成promise对象
	} catch(err) {
		return Promise.reject(err)
	}
}

//调用多个方法
const All = (num1, num2) => {
	console.log('in clinet/All')
	let conn = connection(port)
	const Calculator = new Cal(conn)
	let result = {}
	let work = new entry_types.Work()
	work.num1 = num1
	work.num2 = num2
	work.op = entry_types.Operation.DIVIDE2

	Promise.all([
		Calculator.ping('天柱医药'),
		Calculator.add(num1, num2),
		Calculator.calculator(work)
	]).then((resp) => {
		result.ping = resp[0]
		result.add = resp[1]
		result.calculator = resp[2]
		
	})

	/*Calculator.calculator(work).then((resp) => {
		console.log('resp', resp)
	}).catch((err) => {
		console.log('err', err)
		console.dir(err)
	})*/

	/*get_resp(Calculator.calculator(work)).then((resp) => {
		console.log('in 1 resp', resp)
		console.dir(resp)
	}).catch((err) => {
		console.log('err', err)
		console.dir(err)
	})*/

	return result
}

module.exports = { Add: Add, All: All }