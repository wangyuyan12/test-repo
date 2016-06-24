import React, { Component } from 'react'
import './state-props.less'

class StateExample extends Component {
	constructor(props) {
		super(props)
		this.state = ({ myMood: 'ok' })   //state init 
	}
	changeMood() {
		this.setState({
			myMood: this.state.myMood === 'ok' ? 'not ok' : 'ok'
		})
	}

	componentWillMount() {
		alert('StateExample Will Mount')
	}
	componentDidMount() {
		alert('StateExample Did Mount')
	}
	componentWillUpdate() {
		alert('Mood Will Update')
	}
	componentDidUpdate() {
		alert('Mood Did Update')
	}

	render() {
		const { name } = this.props
		return (
			<div className='greeting'>
				<p >Are you OK? <span>{ name }</span></p>
				<p>{ this.state.myMood }</p>
				<input type="button" value='change mood' onClick={ this.changeMood.bind(this) }/>
			</div>
		)
	}
}
export default StateExample