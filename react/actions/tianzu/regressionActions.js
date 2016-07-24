import * as regressionActions from '../../constants/tianzu/tianzuTypes.js'
import fetch from 'isomorphic-fetch'

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


function objToQueryParam(obj) {
    let str = ''

    if (obj !== null && obj !== undefined) {
        Object.keys(obj).map(key => (str = str + key.toString() + '=' + obj[key].toString() + '&'))
        str = str.substring(0, str.length - 1)
    }
    return str
}

function queryApiHasBody(method, url, reqParam, paramType, index, dispFunName, token) {
    let ContentType = null

    if (/json/i.test(paramType)) {
        if ((typeof reqParam) === 'string') {
            reqParam = strToJson(reqParam)
        } else if ((typeof reqParam) === 'object') {
            reqParam = JSON.stringify(reqParam)
        }
        ContentType = 'application/json'
    } else {
        if ((typeof reqParam) === 'object') {
            reqParam = objToQueryParam(reqParam)
        }
        ContentType = 'application/x-www-form-urlencoded'
    }

    if (token != null && token != undefined && token != '') {
        token = 'token\ \ ' + token
    }

    return dispatch => {
        dispatch(eval(dispFunName + 'Requ')())
        return fetch(url, {
            method: method,
            mode: 'cors',
            headers: {
                "Content-Type": ContentType,
                'Authorization': token
            },
            body: reqParam
        }).then(function(res) {
            if (res.ok) {
                res.text().then(data => dispatch(eval(dispFunName + 'Resp')(data, index, res.status)))
            } else {
                let error = 'Error: Response Status = ' + res.status
                dispatch(eval(dispFunName + 'Resp')(error, index, res.status))
            }
        }, function(e) {
            alert("Request Exception!")
        })
    }
}

function queryApiNoBody(method, url, reqParam, index, dispFunName, token) {

    if ((typeof reqParam) === 'string') {
        reqParam = reqParam
    } else if ((typeof reqParam) === 'object') {
        reqParam = objToQueryParam(reqParam)
    }

    url = url + '?' + reqParam

    if (token != null && token != undefined && token != '') {
        token = 'token\ \ ' + token
    }

    return dispatch => {
        dispatch(eval(dispFunName + 'Requ')())
        return fetch(url, {
            method: method,
            mode: 'cors',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': token
            }
        }).then(function(res) {
            if (res.ok) {
                res.text().then(data => dispatch(eval(dispFunName + 'Resp')(data, index, res.status)))
            } else {
                let error = 'Error: Response Status = ' + res.status
                dispatch(eval(dispFunName + 'Resp')(error, index, res.status))
            }
        }, function(e) {
            alert("Request Exception!");
        })
    }
}

//多个API回归时采用
function normalRequ() {
    return ({
        type: regressionActions.REG_NORMALREQUEST
    })
}

function normalResp(data, index, status) {
    return ({
        type: regressionActions.REG_NORMALRESPONSE,
        data: data,
        index: index,
        status: status
    })
}

export function normalRequest(method, url, reqParam, paramType, index, token) {
    return dispatch => {
        if (/head/i.test(method) || /get/i.test(method)) {
            return dispatch(queryApiNoBody(method, url, reqParam, index, 'normal', token))
        } else {
            return dispatch(queryApiHasBody(method, url, reqParam, paramType, index, 'normal', token))
        }

    }
}

//单个API回归时采用
function singleRequ() {
    return ({
        type: regressionActions.REG_SINGLEREQUEST
    })
}

function singleResp(data, index, status) {
    return ({
        type: regressionActions.REG_SINGLERESPONSE,
        data: data,
        index: index,
        status: status
    })
}

export function singleApiRequest(method, url, reqParam, paramType, index, token) {
    return dispatch => {
        if (/head/i.test(method) || /get/i.test(method)) {
            return dispatch(queryApiNoBody(method, url, reqParam, index, 'single', token))
        } else {
            return dispatch(queryApiHasBody(method, url, reqParam, paramType, index, 'single', token))
        }

    }
}


function loadFileRequ() {
    return ({
        type: regressionActions.REG_LOADFILEREQUEST
    })
}

function loadFileResp(data, index, status) {
    return ({
        type: regressionActions.REG_LOADFILERESPONSE,
        data: data,
        index: index,
        status: status
    })
}

export function loadFileRequest(method, url) {
    return dispatch => {
        return dispatch(queryApiNoBody(method, url, null, null, 'loadFile', null))
    }
}

function loginRequ() {
    return ({
        type: regressionActions.REG_LOGINREQUEST
    })
}

function loginResp(data, index, status) {
    return ({
        type: regressionActions.REG_LOGINRESPONSE,
        data: data
    })
}

export function getLoginToken(url, reqParam) {
    console.log('in getLoginToken')
    return dispatch => {
        return dispatch(queryApiHasBody('POST', url, reqParam, '', null, 'login', null))
    }
}

export function clearApiStatus() {
    return ({
        type: regressionActions.REG_CLEARSTATUS
    })
}

export function frontFailedApi() {
    return ({
        type: regressionActions.REG_GETFAILEDAPI
    })
}