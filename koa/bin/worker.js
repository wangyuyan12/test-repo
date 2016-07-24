'use strict'
if( process.env.NODE_ENV === 'development' ) {
	require('../config/dev.env.config')
} else if( process.env.NODE_ENV === 'test' ) {
	require('../config/test.env.config')
} else if( process.env.NODE_ENV === 'production' ) {
	require('../config/prod.env.config')
}

const PORT = listen_port || 3000
const graceful = require('graceful')
const app = require('./app.js')
const path = require('path')
const log4js = require('koa-log4')

//为什么要重新定义一次？？
const rootDir = path.resolve(__dirname, '..')
const logDir = path.join(rootDir, 'logs')
log4js.configure(path.join(rootDir, 'config/log4js.json'), { cwd: logDir })
const logger = log4js.getLogger('graceful')

logger.info('[worker:%s] web server start listen on %s', process.pid, PORT)

graceful({
	server: [app],
	killTimeout: 3000,
	error: function (err, throwErrorCount) {
		// body...
		if(err.message) {
			err.message += ' (uncaughtException throw ' + throwErrorCount +
				' times on pid:' + process.pid + ')'
		}
	}
})