import {
	LOGINTREQUEST,
	LOGINRESPONSE,
	GETUSERTOKEN,
	SENDGETREQUEST,
	SENDGETRESPONSE,
	SENDNOTGETREQUEST,
	SENDNOTGETRESPONSE
}
from '../../constants/tianzu/tianzuTypes.js'

const initState = {
	token: null,
	loginSuccess: null,
	response: null,
	getRespSucc: null

}

export default function interfaceReducer(state = initState, action) {

	switch (action.type) {
		//actions 

		case LOGINTREQUEST:
			return (Object.assign({}, state, {
				token: null
			}, {
				loginSuccess: null
			}))
			break

		case LOGINRESPONSE:
			try {
				let data = JSON.parse(action.data.trim())
				let token = data.token || 'failed to login'
				return (Object.assign({}, state, {
					token: data.token
				}, {
					loginSuccess: true
				}))
			} catch (err) {
				return (Object.assign({}, state, {
					loginSuccess: false
				}))
			}
			break

		case SENDGETREQUEST:
			return (Object.assign({}, state, {
				response: null
			}, {
				getRespSucc: null
			}))
			break

		case SENDGETRESPONSE:
			try {
				let data = JSON.parse(action.data.trim())
				let resp = JSON.stringify(data || 'Error', null, 4)
				return (Object.assign({}, state, {
					response: resp
				}, {
					getRespSucc: true
				}))
			} catch (err) {
				let resp = " Return Data is not in JSON Format " + ' \n ' + action.data
				return (Object.assign({}, state, {
					response: resp
				}, {
					getRespSucc: true
				}))
			}
			break

		case SENDNOTGETREQUEST:
			return (Object.assign({}, state, {
				response: null
			}, {
				getRespSucc: null
			}))
			break

		case SENDNOTGETRESPONSE:
			try {
				let data = JSON.parse(action.data.trim())
				let resp = JSON.stringify(data || 'Error', null, 4)
				return (Object.assign({}, state, {
					response: resp
				}, {
					getRespSucc: true
				}))
			} catch (err) {
				let resp = " Return Data is not in JSON Format " + ' \n ' + action.data
				return (Object.assign({}, state, {
					response: resp
				}, {
					getRespSucc: true
				}))
			}
			break

		case GETUSERTOKEN:
			return (Object.assign({}, state, {
				loginSuccess: null
			}))

		default:
			return state
	}
}