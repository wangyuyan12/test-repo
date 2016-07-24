'use strict'

const path = require('path')
const rootDir = path.resolve(__dirname, '..')
const logDir = path.join(rootDir, 'logs')
/*生成logs目录*/
 try {
 	require('fs').mkdirSync(logDir)
 } catch(err) {
 	if(err.code !== 'EEXIST') {
 		console.error('Could not set up log directory, error was: ', err)
 		process.exit(1)
 	}
 }

const log4js = require('koa-log4')
log4js.configure(path.join(rootDir, 'config/log4js.json'), { cwd: logDir })
const logger = log4js.getLogger('startup')
logger.info('logs config finished!')

