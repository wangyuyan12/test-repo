import * as tianzuActions from '../../constants/tianzu/tianzuTypes.js'
import fetch from 'isomorphic-fetch'

function objToQueryParam(obj) {
	let str = ''
	if (obj !== null && obj !== undefined) {
		Object.keys(obj).map(key => (str = str + key.toString() + '=' + obj[key].toString() + '&'))
		str = str.substring(0, str.length - 1)
	}
	return str
}

function strToJson(str) {
	let tmpObj = {}
	try {
		tmpObj = JSON.parse(str) //如果整个字符串是JSON格式
	} catch (err) {
		str.split('&').map((item, index) => {
			let arr = item.trim().split('=')

			//将对象，数组，数字，true， false 转换为非字符串
			if ((/\'(.*)\'/i.test(arr[1]))) { //参数中注明为字符串
				arr[1] = arr[1].substring(1, arr[1].length - 1)
			} else if (/\{.+\}/i.test(arr[1])) {
				try {
					arr[1] = JSON.parse(arr[1])
				} catch (e) {
					alert('Wrong Param: ' + e.toString())
				}
			} else if ((/false/.test(arr[1]) || /true/.test(arr[1]) || /\[.+\]/i.test(arr[1])) || //提取false true Array
				(!/[A-Za-z]/i.test(arr[1]) && !/([\u4e00-\u9fa5])+/.test(arr[1]) && !/((?=[\x21-\x7e]+)[^A-Za-z0-9])/.test(arr[1])) //排除String
				&& /\d+/i.test(arr[1])) { //提取 Number
				arr[1] = eval(arr[1])
			}
			tmpObj = Object.assign({}, tmpObj, {
				[arr[0]]: arr[1]
			})
		})
	}

	return JSON.stringify(tmpObj)
}


function queryApiNotGet(method, url, reqParam, paramType, isCors, dispFunName, token) {

	let reqBody = null
	let ContentType = null

	if (/json/i.test(paramType)) { //JSON
		if ((typeof reqParam) === 'string') {
			reqBody = strToJson(reqParam)
		} else if ((typeof reqParam) === 'object') {
			reqBody = JSON.stringify(reqParam)
		}
		ContentType = 'application/json'

	} else { //normal
		if ((typeof reqParam) === 'string') {
			reqBody = reqParam
		} else if ((typeof reqParam) === 'object') {
			reqBody = objToQueryParam(reqParam)
		}
		ContentType = 'application/x-www-form-urlencoded'
	}

	let headers = {}
	if(isCors) {
		headers = {
			'Content-Type': ContentType
		}
	} else {
		if (token != null && token != undefined && token != '') {
			token = 'token\ \ ' + token
		}
		headers = {
			'Content-Type': ContentType,
			'Authorization': token
		}
	}

	return dispatch => {
		dispatch(eval(dispFunName + 'Requ')())
		return fetch(url, {
			method: method,
			mode: 'cors',
			headers: headers,
			body: reqBody
		}).then(function(res) {
			if (res.ok) {
				res.text().then(data => dispatch(eval(dispFunName + 'Resp')(data, reqParam)))
			} else {
				let error = 'Error: Response Status = ' + res.status
				dispatch(eval(dispFunName + 'Resp')(error, reqParam))
			}
		}, function(e) {
			alert("Request Exception!");
		})
	}
}

function queryApiGet(url, reqParam, isCors, dispFunName, token) {

	let reqBody = null
	if ((typeof reqParam) === 'string') {
		reqBody = reqParam
	} else if ((typeof reqParam) === 'object') {
		reqBody = objToQueryParam(reqParam)
	}

	url = url + '?' + reqBody;

	let headers = {}
	if(isCors) {
		headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	} else {
		if (token != null && token != undefined && token != '') {
			token = 'token\ \ ' + token
		}
		headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': token
		}
	}

	return dispatch => {
		dispatch(eval(dispFunName + 'Requ')())
		return fetch(url, {
			method: 'GET',
			mode: 'cors',
			headers: headers
		}).then(function(res) {
			if (res.ok) {
				res.text().then(data => dispatch(eval(dispFunName + 'Resp')(data, reqParam)))
			} else {
				let error = 'Error: Response Status = ' + res.status
				dispatch(eval(dispFunName + 'Resp')(error, reqParam))
			}
		}, function(e) {
			alert("Request Exception")
		})
	}
}

//Login
function loginRequ() {
	return ({
		type: tianzuActions.LOGINTREQUEST
	})
}

function loginResp(data, reqParam) {
	return ({
		type: tianzuActions.LOGINRESPONSE,
		data: data
	})
}

export function loginTianzu(url, reqParam) {
	return dispatch => {
		return dispatch(queryApiNotGet('POST', url, reqParam, false, '', 'login'))
	}
}

export function getUserToken() {
	return ({
		type: tianzuActions.GETUSERTOKEN
	})
}

//send NotGet request
function notGetRequ() {
	return ({
		type: tianzuActions.SENDNOTGETREQUEST
	})
}

function notGetResp(data, reqParam) {
	return ({
		type: tianzuActions.SENDNOTGETRESPONSE,
		data: data
	})
}

export function sendNotGetRequest(method, url, reqParam, paramType, isCors, token) {
	return dispatch => {
		return dispatch(queryApiNotGet(method, url, reqParam, paramType, isCors, 'notGet', token))
	}
}

//send get request
function getRequ() {
	return ({
		type: tianzuActions.SENDGETREQUEST
	})
}

function getResp(data, reqParam) {
	return ({
		type: tianzuActions.SENDGETRESPONSE,
		data: data
	})
}

export function sendGetRequest(url, reqParam, isCors, token) {
	return dispatch => {
		return dispatch(queryApiGet(url, reqParam, isCors, 'get', token))
	}
}