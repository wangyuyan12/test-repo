import React, { Component } from 'react'
import { render } from 'react-dom'

import fetch from 'isomorphic-fetch'

function objToQueryParam(obj) {
	let str = ''
	Object.keys(obj).map( key => (str = str + key.toString() + '=' + obj[key].toString() + '&'))
	str = str.substring(0, str.length-1)
	console.log(str)
	return str
}

function obj2String(obj) {
		let tmp = [];

		if(typeof obj == 'string') {
			return "\""+obj.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\""; 
		}

		if(typeof obj == 'object') {
			if(!obj.sort) {
				for(let key in obj) {
					tmp.push(key + ': ' + obj2String(obj[key]))
				}
				if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){ 
    				tmp.push("toString:"+obj.toString.toString()); 
   				} 
   				tmp="{"+tmp.join()+"}"; 
			} else {
				for(let i=0; i<obj.length; i++){ 
    				tmp.push(obj2string(obj[i])) 
   				}
   				tmp =  "["+ tmp.join() +"]"
			}
			return tmp.replace(/,/g, '\n')
		}
		return obj.toString();
	}
function arrayRender(arr) {

}
function alertObj(obj){
	var output = "";
	for(var i in obj){  
		var property=obj[i];  
		output+=i+" = "+property+"\n"; 
	}  
	return output
}

class Test extends Component {
	constructor(props) {
		super(props)
		this.state = ({
			objString: 'tmp'
		})
	}

	fetchApiTestPost() {

		let req = {account: '18857108370', password: '123456'}
		req = objToQueryParam(req)
		let token = 'token\ \ 791db0cbf85bc4c223802b66ce72e9ccd3ae9b11'

		fetch('http://test.eyaos.com/clogin', {
	  		method: "POST",
	  		mode: 'cors',
		  	headers: {
		   		 "Content-Type": "application/x-www-form-urlencoded",
		   		 'Authorization': token
		 	},
		 	body: req
		}).then(function(res) {
	  		if (res.ok) {
	   			res.json().then(data => console.dir(data))
	  		} else if (res.status == 401) { 
	   			 alert("Oops! You are not authorized.");
	  		}
		}, function(e) {
	 		 alert("Error submitting form!");
		});  
	}

	fetchApiTestGet() {
		let url = 'http://test.eyaos.com/news/api/list'
		let param = {area: 12568}
		param = objToQueryParam(param)
		url = url + '?' + param
		let token = ''

		fetch(url, {
	  		method: "GET",
	  		mode: 'CORS',
		  	headers: {
		   		 "Content-Type": "application/x-www-form-urlencoded",
		   		 'Authorization': token
		 	},
		}).then(function(res) {
	  		if (res.ok) {
	   			res.json().then(data => console.dir(data))
	  		} else if (res.status == 401) {
	   			 alert("Oops! You are not authorized.");
	  		}
		}, function(e) {
	 		 alert("Error submitting form!");
		});
	}
	handleObj2String() {
		let obj = {name: {fname: 'bush\n', lname: 'gorg'}, age: 20, home: 'hangzhou'}

		 let tmp = JSON.stringify(obj, null, 4)
		// let tmp = alertObj(obj)
		this.setState({objString: tmp})
		console.log(tmp)
	} 
	render() {
		return(
			<div>
				<button onClick={this.fetchApiTestPost.bind(this)}>POST</button>
				<button onClick={this.fetchApiTestGet.bind(this)}>GET</button>
				<button onClick={this.handleObj2String.bind(this)}>Obj2String</button>
				<div> <pre>{ this.state.objString }</pre> </div>
			</div>

		)
	}
}


render(
	<Test />,
	document.getElementById('index-page')
)

