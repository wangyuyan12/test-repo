import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

const rootRoute = {
	childRoutes: [{
		path: '/src/poster2',
		component: require('./components/poster'),
	}]
}

const rootElem = (<Router history={ browserHistory } routes={rootRoute} />)

render(
	rootElem,
	document.getElementById('poster')
)