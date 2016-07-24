import React, { Component } from 'react'
import { Link } from 'react-router'

import './temp-nav.less'

class TempNav extends Component {
	constructor(props) {
		super(props)
		this.evtMouseEnter = this.evtMouseEnter.bind(this)
		this.evtMouseLeave = this.evtMouseLeave.bind(this)
	}

	getParentNode(targetNode, className) {
		while(targetNode.className !== className) {
			targetNode = targetNode.parentNode
		}
		return targetNode
	}
	getChildNode(targetNode, className) {
		let children = targetNode.childNodes
		for( let item of children.values() ) {
			if(item.className === className) {
				return item
			}
		}
	}

	evtMouseEnter(e) {
		let fatherNode = this.getParentNode(e.target, 'temp-unit')
		this.getChildNode(fatherNode, 'cover' ).style.display = 'block'
	}
	evtMouseLeave(e) {
		let fatherNode = this.getParentNode(e.target, 'temp-unit')
		this.getChildNode(fatherNode, 'cover' ).style.display = 'none'
	}
	render() {
		return(
			<div className='nav-wrapper'>
				<div className='temp-unit'
					onMouseEnter={this.evtMouseEnter}
					onMouseLeave={this.evtMouseLeave}>
					<img src="/static/poster/resource/test1.jpg" alt=""/>

					<div className='cover' style={{display: 'none'}}>
						<Link to='/poster/test'>
							<input type="button" value='选择'/>
						</Link>
					</div>
				</div>
				<div className='temp-unit'
					onMouseEnter={this.evtMouseEnter}
					onMouseLeave={this.evtMouseLeave}>
					<img src="/static/poster/resource/test2.jpg" alt=""/>

					<div className='cover' style={{display: 'none'}}>
						<Link to='/poster'>
							<input type="button" value='选择'/>
						</Link>
					</div>
				</div>
				<div className='temp-unit'
					onMouseEnter={this.evtMouseEnter}
					onMouseLeave={this.evtMouseLeave}>
					<img src="/static/poster/resource/test3.jpg" alt=""/>

					<div className='cover' style={{display: 'none'}}>
						<Link to='/poster'>
							<input type="button" value='选择'/>
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default TempNav