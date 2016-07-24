'use strict'

const co = require('co')
const log4js = require('koa-log4')
const logger = log4js.getLogger('finalHandler')

function finalHandler() {
	return co.wrap(function* (ctx, next){
		try {
			yield next()
			//handle 404
			let status = ctx.status || 404
			console.log('status: ', ctx.status)
			if(status === 404) ctx.throw(404)
		} catch(error) {
			logger.error(error)
			ctx.status = error.status || 500
			if(ctx.status === 404) {
				yield ctx.render('error/404')
			} else {
				yield ctx.render('error/error', { error })
			}
		}
	})
}

module.exports = finalHandler