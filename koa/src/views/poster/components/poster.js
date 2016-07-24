import React, { Component } from 'react'
import TempNav from './temp-nav'
import './poster.less'

class Poster extends Component {
	constructor(props) {
		super(props)
		console.log(this.props.children)
	}
	render() {
		return (
			<div className='wrapper'>
				<div className='head'>
					<span>海报制作</span>
				</div>
				<div className='left-nav'>
				 	<TempNav></TempNav>
				</div>
				<div className='poster-wrapper'>
					<div className='poster-container' id='poster-container'>
						<div className='banner-pos' id='banner-pos'>
						{ this.props.children }
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Poster