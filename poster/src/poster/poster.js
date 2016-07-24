import React, { Component } from 'react'
// import Banner from './component/banner'
import './poster.less'
class Poster extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='wrapper'>
				<div className='head'>
					<span>海报制作</span>
				</div>
				<div className='template-container'>
				 <div className='template-unit'>
				 	<span>okok</span>
				 </div>
				</div>
				<div className='poster-wrapper'>
					<div className='poster-container' id='poster-container'>
						<div className='banner-pos' id='banner-pos'>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Poster