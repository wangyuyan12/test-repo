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
			logger.info('[worker:%s]', process.pid, err.message)
		}
	}
})