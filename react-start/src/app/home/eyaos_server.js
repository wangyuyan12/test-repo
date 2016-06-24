'use strict'

const thrift = require('thrift')
const EyaosRPC = require('../../../thrift/lib/gen-nodejs/EyaosRPC')

class EyaosServer {

	constructor(connection) {

		if(!connection) {
			throw new Error('host for thrift connection is needed')
		} 
		//构造函数中先创建连接

		this.client =  thrift.createClient(EyaosRPC, connection)

	}

	get_login_status(session_id) {
		return new Promise((resolve, reject) => {
			this.client.get_login_status(session_id, (err, resp) => {
				if(err) {
					reject(new Error(err))
				}
				resolve(resp)
			})
		}
	)}

	get_home_banners(num) {
		return new Promise((resolve, reject) => {
			this.client.get_home_banners(num, (err, resp) => {
				if(err) {
					reject(new Error(err))
				} 
				resolve(resp)
			})
		})
	}

	get_new_skus(num) {
		return new Promise((resolve, reject) => {
			this.client.get_new_skus(num, (err, resp) => {
				if(err) {
					reject(new Error(err))
				}
				resolve(resp)
			})
		})
	}

	get_proxy_infos(num) {
		return new Promise((resolve, reject) => {
			this.client.get_proxy_infos(num, (err, resp) => {
				if(err) {
					reject(new Error(err))
				} 
				resolve(resp)
			})
		})
	}

	get_good_enterprises(num) {
		return new Promise ((resolve, reject) => {
			this.client.get_good_enterprises(num, (err, resp) => {
				if(err) {
					reject(new Error(err))
				} 
				resolve(resp)
			})
		})
	}

	get_medical_messages(num) {
		return new Promise((resolve, reject) => {
			this.client.get_medical_messages(num, (err, resp) => {
				if(err) {
					reject(new Error(err))
				} 
				resolve(resp)
			})
		})
	}

	get_hiring_infos(num) {
		return new Promise((resolve, reject) => {
			this.client.get_hiring_infos(num, (err, resp) => {
				if(err) {
					reject(new Error(err))
				} 
				resolve(resp)
			})
		})
	}

}

module.exports = EyaosServer
