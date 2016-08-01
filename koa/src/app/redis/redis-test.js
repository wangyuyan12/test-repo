gi'use strict'

var redis = require("ioredis");

let client = new redis({
	port: 6379,
	host: '127.0.0.1'
})

var obj = { secret: '1QMXxvWMSV1RxY_XxWHZpT-o' }

client.set('FAJTHAiL_Sv92X8esfSQe_jlMrU2ldTv', JSON.stringify(obj))
client.set('FAJTHAiL_Sv92X8esfSQe_jlMrU2ldTv2', obj)
client.get('FAJTHAiL_Sv92X8esfSQe_jlMrU2ldTv').then((res) => {
	console.log('result', res)
})


client.get('FAJTHAiL_Sv92X8esfSQe_jlMrU2ldTv2').then((res) => {
	console.log('result', res)
})