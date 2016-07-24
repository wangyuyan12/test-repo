import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
// import Poster from './poster'

const rootRoute = {
	childRoutes: [{
		path: '/',
		component: require('./poster.js'),
		/*childRoutes: [

		]*/
	}]
}

render(
	<Router history={ browserHistory } routes={ rootRoute } />,
	document.getElementById('poster')
)