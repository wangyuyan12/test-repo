import React, { Component } from 'react'
import StateExample from './state-props' 

class HelloWorld extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h1>Hello World!</h1>
				<StateExample name='feifeiyu' />
			</div>
		)
	}
}

export default HelloWorld
