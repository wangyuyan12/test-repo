'use strict'

const mysql = require('mysql')

let mysqlConf = require('../../config/dev.env.config').poolConfig

if( process.env.NODE_ENV === 'test' ) {
	const mysqlConf = require('../../config/test.env.config').poolConfig
} else if( process.env.NODE_ENV === 'production' ) {
	const mysqlConf = require('../../config/prod.env.config').poolConfig
}

/*let connCreate = (config, callback_) => {
	const conn = mysql.createConnection(config)
	conn.connect((err) => {
		if(err) {
			callback_(err, null)
		} else {
			callback_(null, conn)
		}
	})
}

let mysqlConnection = () => {
	return new Promise((resolve, reject) => {
		connCreate(connConf, (err, conn) => {
			if(err) {
				reject(err)
			}
			resolve(conn)
		})
	})
}*/

let poolCreate = (config, callback_) => {
	const pool = mysql.createPool(config)
	pool.getConnection((err, conn) => {
		if(err) {
			callback_(err, null)
		} else {
			callback_(null, conn)
		}
	})
}

let mysqlPool = () => {
	return new Promise((resolve, reject) => {
		poolCreate(mysqlConf, (err, conn) => {
			if(err) {
				reject(err)
			}
			resolve(conn)
		})
	})
}

module.exports = mysqlPool