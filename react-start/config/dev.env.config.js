'use strict'

//配置本地开发环境

//服务侦听端口
global.listen_port = 3000

//RPC 服务
//RPC服务地址(使用后台开发电脑的IP，链接公司内局域网)
//rpc端口号，使用后台开发开放的端口
global.rpc_config = new Map(
	[['test',['localhost', 9091]],  //[['应用名称'， ['目标机器地址'， rpc端口号]]]
	['home', ['localhost', 9090]], 
	['prodetail', ['localhost', 9091]]
])
 
//根域名
global.base_domain = 'http://localhost:8000'


