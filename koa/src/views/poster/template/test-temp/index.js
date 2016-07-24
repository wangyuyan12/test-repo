import TestTemp from './test-temp'
//如果 import 的目标文件 使用的是export default XXX 导出， 一定要import方式引入
//如果使用 require 需要使用 module.exports 导出
export default {
	path: 'test',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, TestTemp)
		})
	}
}