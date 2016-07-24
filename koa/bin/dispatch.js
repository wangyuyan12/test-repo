'use strict'

require('./log')
const cluster = require('cluster')
const path = require('path')
const log4js = require('koa-log4')

//为什么要重新定义一次？？
const rootDir = path.resolve(__dirname, '..')
const logDir = path.join(rootDir, 'logs')
log4js.configure(path.join(rootDir, 'config/log4js.json'), { cwd: logDir })
const logger = log4js.getLogger('graceful')

cluster.setupMaster({
	exec: path.join(__dirname, 'worker.js')
})

cluster.fork()

cluster.on('disconnect', function(worker) {
	let w = cluster.fork()
	console.error('[%s] [master:%s] wroker:%s disconnect! new worker:%s fork', 
    new Date(), process.pid, worker.process.pid, w.process.pid)
    logger.error('[master:%s] wroker:%s disconnect! new worker:%s fork', 
    	process.pid, worker.process.pid, w.process.pid)
})

cluster.on('exit', function(worker) {
	console.error('[%s] [master:%s] wroker:%s exit!', 
    new Date(), process.pid, worker.process.pid)
    logger.error('[master:%s] wroker:%s exit!', 
    	process.pid, worker.process.pid)
})
