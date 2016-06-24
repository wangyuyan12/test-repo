// import React from 'react'
// import { render } from 'react-dom'

// render(
// 	<h1>Hello, World!</h1>,
// 	document.getElementById('example')
// )





import React from 'react'
import { render } from 'react-dom'
import HelloWorld from './hello-world'
import './index.less'

render(
	<HelloWorld></HelloWorld>,
	document.getElementById('example')
)