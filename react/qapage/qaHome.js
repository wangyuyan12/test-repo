import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap/lib'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import configureStore from '../stores/configureStore'
import LeftNav from './component/leftNav.js' 
import ApiTest from './application/apiTest.js'
import ApiRegression from './application/apiRegression.js'
import './qaHome.less'

let navContent = [
	{
		itemName: '接口测试',
		itemAction: '/interTest'
	}, 
	{
		itemName: '接口回归',
		itemAction: '/interRegress'
	}
]

class QaHome extends Component {
	constructor(props) {
		super(props)
	}

	render() {

		return (
			<div className="wrapper">
				<div className="nav-wrapper">
					<LeftNav navList={navContent}/>
				</div>
				<div className="page-wrapper">
					{ this.props.children }
				</div>		
			</div>
		)
	}
}

let store = configureStore()

let PageRoute = (
	<Provider store={store}>
		<Router history={ browserHistory }>
			<Route path='/' component={ QaHome }>
				<IndexRoute component={ ApiTest }/>
				<Route path='/interTest' component={ ApiTest } />
				<Route path='/interRegress' component={ ApiRegression } />
			</Route>
		</Router>
	</Provider>
)

export default PageRoute