import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Poster from './components/poster'
import TestTemp from './template/test-temp/index'
const rootRoute = {
	childRoutes: [{
		path: '/poster',
		component: Poster,
		childRoutes: [
			TestTemp
		]
	}]
}
console.log('testtemp', TestTemp)

const rootRouter = (<Router history={ browserHistory } routes={rootRoute} />)

render(
	rootRouter,
	document.getElementById('poster')
)