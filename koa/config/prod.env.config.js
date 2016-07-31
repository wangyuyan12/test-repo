'use strict'

//配置生产环境

//服务侦听端口
global.listen_port = 80  

//根域名
global.base_domain = ''

//mysql 链接
//普通链接
/*let sqlConfig = { 
	host: '192.168.1.100',
	port: '3306',
	user: 'root',
	password: 'mysql123',
	database: 'kuaijie'
}*/
//采用连接池连接
let poolConfig = {
	host: '192.168.1.100',
	port: '3306',
	user: 'root',
	password: 'mysql1234',
	database: 'password',
	// connectionLimit: 10,
}

//redis
let redisConfig = {
	port: 6379,
	host: '127.0.0.1',
}

module.exports = { poolConfig: poolConfig, 
				   redisConfig: redisConfig,
				}