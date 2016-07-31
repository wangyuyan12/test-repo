'use strict'

const mysql = require('mysql')

let connConf = {
	host: '192.168.1.100',
	port: '3306',
	user: 'root',
	password: 'mysql123',
	database: 'kuaijie'
}

let connCreate = (config, callback_) => {
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
}

let poolConf = {
	host: '192.168.1.100',
	port: '3306',
	user: 'root',
	password: 'mysql123',
	database: 'kuaijie',
}

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
		poolCreate(poolConf, (err, conn) => {
			if(err) {
				reject(err)
				console.log('error ooh')
			} else {
				resolve(conn)
				console.log('success, yeal')
			}
			
		})
	})
}

/*mysqlConnection().then((conn) => {
	console.log('connected as id ' + conn.threadId)
	conn.query('SELECT * FROM kuaijie.purchase_order where id = ?', [6], (err, rows) => {
		if(err) {
			console.log(err.code)
		} else {
			console.log('result', rows)
		}
		conn.end()
	})


}).catch((err) => {
	cconsole.log('error connection: ' + err.stack)
})*/
mysqlPool().then((conn) => {
	console.log('conn pool', conn.threadId)
	conn.query('insert into kuaijie.purchase_order ( number, total, deposit, remain, create_time, order_state, company_id, shop_id ) values (2016718312345265, 1000, 0.00, 300, "2016-07-12 16:43:54", 2, 1, 3);', (err, result) => {
		if(err) {
			console.log(err.code)
		} else {
			console.log('result inset', result)
		}
		conn.release()
	})
})

mysqlPool().then((conn) => {
	console.log('conn pool', conn.threadId)
	conn.query('SELECT * FROM kuaijie.purchase_order where id = ?', [8], (err, rows) => {
		if(err) {
			console.log(err.code)
		} else {
			console.log('result', rows)
		}
		conn.release()
	})
})



