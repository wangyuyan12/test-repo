'use strict'

const thrift = require('thrift')
const co = require('co')
const log4js = require('koa-log4')
const EyaosServer = require('./eyaos_server.js')
const entry_types = require('../../../thrift/lib/gen-nodejs/index_types')
 // const exception = require('../../../thrift/lib/gent-nodejs/exception_types')

//定义端口号,应对多端口
const host = rpc_config.get('home')[0]
const port = rpc_config.get('home')[1]
const logger = log4js.getLogger('home')

//建立rpc链接
let connection = () => {
	const conn = thrift.createConnection(host, port)
	conn.on('error', (err) => {
		logger.error(err)
		throw new Error(err)
	})
	return conn
}

let get_resp = (func) => {
	let resp = func.then((resp) => ( resp ))
			.catch((err) => { 
				logger.error(err)
				return null
			})
	return Promise.resolve(resp) //重新封装成promise对象
}

//数据重载标签
let needToreaload = true
//由于登入问题，暂时先关闭缓存
//每隔一段时间，使能一次 重载
// setInterval(() => { needToreaload = true }, 30000)

//闭包，实现数据缓存
let get_result = ((session_id) => {

	let result = {}

	return (session_id) => {
		if( needToreaload ) {
			
			return co(function* (){

				let conn = connection() //建立连接
				let eyaos = new EyaosServer(conn)  //初始化客户端

				if(session_id) {  
					result.login = ( yield get_resp( eyaos.get_login_status(session_id) )) || {}  //登入//
				} else {
					result.login = {}
				}
				result.banners = ( yield get_resp( eyaos.get_home_banners(1) )) || []  //首页banner
				result.skus = ( yield get_resp( eyaos.get_new_skus(6) )) || []  //最新发布产品
				result.proxies = ( yield get_resp( eyaos.get_proxy_infos(6) )) || []  //代理商信息
				result.enters = ( yield get_resp( eyaos.get_good_enterprises(6) )) || []  //优质企业
				result.msgs = ( yield get_resp( eyaos.get_medical_messages(8) )) || []  //医药资讯
				result.hires = ( yield get_resp( eyaos.get_hiring_infos(12) )) || []  //求职招聘

				conn.end()  //关闭连接

				return result
			}).then((result) => { 

					//由于登入问题，暂时先关闭缓存
					// needToreaload = false  //重新加载标志清空
					// logger.debug('result', result)
					if( Object.keys(result.login).length !== 0) {
						result.login.is_login = true

						if(result.login.is_enterprise || result.login.role_ids.length > 0) {
							result.login.is_manage = true
						} else {
							result.login.is_manage = false
						}
						
					} else {
						result.login.is_login = false
						result.login.is_manage = false
					}

					//配置产品详情页
					result.skus.map((item, index) => {
							result.skus[index].goto_url = base_domain + '/sku/m/detail/' + item.id
						})

					//配置代理祥情页
					result.proxies.map((item, index) => {
							result.proxies[index].goto_url =  base_domain + '/user/m/proxy/detail/v2/' + item.eid
							result.proxies[index].proxy_areas = '代理：' + item.areas +'等'
							if(item.province_num > 0) {
								result.proxies[index].proxy_areas=
									result.proxies[index].proxy_areas.concat(item.province_num + '个省')
							}
							if(item.city_num > 0) {
								result.proxies[index].proxy_areas=
									result.proxies[index].proxy_areas.concat(item.city_num + '个市')
							}
							if(item.hospital_num > 0) {
								result.proxies[index].proxy_areas=
									result.proxies[index].proxy_areas.concat(item.hospital_num + '家医院')
							}
						})

					//配置企业详情页
					result.enters.map((item, index) => {
							result.enters[index].goto_url =  base_domain + '/enterprise/sku/list?enterprise=' + item.id
						})

					//配置医疗信息页
					result.msgs.map((item, index) => {
							result.msgs[index].goto_url =  base_domain + '/news/mdetail/' + item.id
							result.msgs[index].create_time = item.create_time.replace(/\d{4}-/, '').replace(/\d{2}:\d{2}:\d{2}/, '').trim()
						})

					//配置招聘详情页
					result.hires.map((item, index) => {
							result.hires[index].goto_url =  base_domain + '/hiring/m/detail/' + item.id
							result.hires[index].create_time = item.create_time.replace(/\d{4}-/, '')
								.replace(/\d{2}:\d{2}:\d{2}/, '').trim().replace(/-/, '月').concat('日')
						})
					result.hires_left = result.hires.slice(0, 6)
					result.hires_right = result.hires.slice(6, 12)

					return result
				}).catch((err) => {
					logger.error('err3', err)
					return result
			})

		} else {
			logger.debug('result is not null, return result')
			return result
		}
	}

})()

const home_data = (session_id) => {
	logger.info('in clinet/home_data')

	return get_result(session_id)
	
}

module.exports = { home_data: home_data } 