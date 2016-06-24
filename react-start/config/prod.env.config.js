'use strict'

//配置生产环境

//服务侦听端口
global.listen_port = 80  

//RPC 服务
global.rpc_config = new Map(
	[['test',['localhost', 9091]],  //[['应用名称'， ['目标机器地址'， rpc端口号]]]
	['home', ['localhost', 9090]], 
	['prodetail', ['localhost', 9091]]
])

//根域名
global.base_domain = 'http://www.eyaos.com'

