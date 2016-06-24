'use strict';
// 产品详情RPC获取客户端
const thrift = require('thrift');
const EyaosRPC = require('../../../thrift/lib/gen-nodejs/SkuRPC');

class Prodetail {
	constructor() {
		let connection = thrift.createConnection(
					rpc_config.get('prodetail')[0], 
					rpc_config.get('prodetail')[1]
				);

		connection.on('error', err => {
		    console.log(err);
		});
		this.client =  thrift.createClient(EyaosRPC, connection)
	}
	getClient(){
		return this.client;
	}

}

module.exports = Prodetail;