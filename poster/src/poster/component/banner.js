import React, { Component, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import './banner.less'

class Banner extends Component {
	constructor(props) {
		super(props)
		this.evtMouseEnter = this.evtMouseEnter.bind(this)
		this.evtMouseLeave = this.evtMouseLeave.bind(this)
		this.evtAddTemplate = this.evtAddTemplate.bind(this)
		this.state = {
			showCover: false,
		}
	}
	evtMouseEnter(e) {
		this.setState({showCover: true})
	}
	evtMouseLeave(e) {
		this.setState({showCover: false})
	}
	evtAddTemplate(e) {
		let newNode = findDOMNode(this.refs.banner)
		newNode = cloneElement(newNode)
		// newNode.setAttribute('added', 'true')
		document.getElementById('banner-pos').appendChild(newNode)
	}
	render() {
		return (
			<div className='banner-unit' 
				onMouseEnter={this.evtMouseEnter}
				onMouseLeave={this.evtMouseLeave}
				ref='banner'
				>
				<img src="../poster/resource/test1.jpg" alt=""/>
				<div className='cover' style={{display: this.state.showCover ? 'block' : 'none'}}>
					<input type="button" value='添加' onClick={this.evtAddTemplate}/>
				</div>
			</div>
		)
	}
}

export default Banner