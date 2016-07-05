import vue from 'vue'
import vueRouter from 'vue-router'
import app from './component/app.vue'
import foo from './component/foo.vue'
import bar from './component/bar.vue'
import baz from './component/baz.vue'
import param from './component/param.vue'
//install router
vue.use(vueRouter)


//routing 
let router = new vueRouter()

router.map({
	'/foo': {
		component: foo,

		subRoutes: {
			'/': {
				component: {
					template: '<p>Default sub view For Foo'
				}
			},
			'/bar': {
				component: bar
			},
			'/baz': {
				component: baz
			},
			'/param/:username' : {
				name: 'param',
				component: param
			}
		}
	},
	'/bar': {
		component: bar
	}
})

router.start(app, '#app')