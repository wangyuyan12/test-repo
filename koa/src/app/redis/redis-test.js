'use strict'

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

client.multi().set('Sv92X8esfSQe_jlMrU2l', 'FAJTHAiL_Sv92X8esfSQe')
	.get('Sv92X8esfSQe_jlMrU2l').exec((err, results) => {
		console.log('multi', results)
	})

let objmap = {
	namefSQe: 'fei',
	agefSQe: 23,
	addrfSQe: 'longyou',
}

client.mset(objmap)
client.get('namefSQe').then(resp => {
	console.log('resp', resp)
})

client.set('2X8esfSQe_jlMrU2larray', 'a')
client.set('2X8esfSQe_jlMrU2larray', 'b')
client.set('2X8esfSQe_jlMrU2larray', 'c')
client.get('2X8esfSQe_jlMrU2larray').then(resp => {
	console.log('resparray', resp)
})

console.log('client', client.set)

