'use strict'

const thrift = require('thrift')
const Calculator = require('../../../thrift/lib/gen-nodejs/Calculator')
const ttypes = require('../../../thrift/lib/gen-nodejs/entry_types')

//将服务器端提供的所有方法以类的形式封装，类是javabean
class Cal {
	constructor(connection) {
		if(!connection) {
			throw new Error('host for thrift connection is needed')
		} 
		//构造函数中先创建连接
		this.client =  thrift.createClient(Calculator, connection)
		// console.dir(this.client)
	}

	ping(chinese) {
		//返回Promise异步对象
		return new Promise((resolve, reject) => {
			this.client.ping(chinese, (err, resp) => {
				console.log('in promise ping()')
				console.log('chinese', chinese)
				if(err) {
					reject(new Error(err))
				} 
				// resp = resp.toString('utf-8', resp)
				console.log('ping zhong', resp)
				resolve(resp)
			})
		})
	}

	add(num1, num2) {
		//返回Promise异步对象
		return new Promise((resolve, reject) => {
			this.client.add(num1, num2, (err, resp) => {
				if(err) {
					reject(new Error(err))
				} 
				resolve(resp)
			})
		})
	}

	calculator(work) {
		//返回Promise异步对象
		return new Promise((resolve, reject) => {
			this.client.calculator(3, work, (err, resp) => {
				if(err) {
					reject(new Error(err))
				}
				resolve(resp)
			})
		})
	}
}

module.exports = Cal
