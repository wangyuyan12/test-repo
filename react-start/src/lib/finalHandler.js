'use strict'

const co = require('co')

function finalHandler() {
	return co.wrap(function* (ctx, next){
		try {
			yield next()

			if(ctx.status === 405) {
			 console.log('in finalhandler')
			yield ctx.render('error/404')
			}
			//handle 404
			let status = ctx.status || 404
			console.log('status: ', ctx.status)
			if(status === 404) ctx.throw(404)
		} catch(error) {
			ctx.status = error.status || 500
			if(ctx.status === 404) {
				console.dir(error)
				yield ctx.render('error/404')
			} else {
				yield ctx.render('error/error', { error })
			}
		}
	})
}

module.exports = finalHandler