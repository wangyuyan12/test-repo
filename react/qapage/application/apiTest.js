import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Navbar, Input, Button } from 'react-bootstrap/lib'
import * as interfaceActions from '../../actions/tianzu/interfaceActions.js'

import './apiTest.less'

class ApiTest extends Component {
	constructor(props) {
		super(props)
		this.state = ({
			testEnv: 'test',
			reqMethod: 'GET',
			reqUrl: '',
			reqParam: '',
			isLogin: true,
			isJson: false,
			accountType: 'agency',
			token: '',
			btnStatus: 'Login...',
			account: '',
			password: '',
			otherAccEnable: false,
			notOther: true,
			interval: null,
			pollInterval: 300000
		})
	}

	handleTestEnv(e) {
		let env = e.target.value

		this.setState({testEnv: env})
	}

	handleReqMethod(e) {
		let method = e.target.value

		this.setState({reqMethod: method})
	}

	handleReqUrl(e) {
		let url = e.target.value
		if(this.state.testEnv === 'test') {
			url = url.replace(/www/i, 'test')
		}
		this.setState({reqUrl: url})
	}

	handleParamType(e) {
		let check = e.target.checked

		this.setState({isJson: check})
	}

	handleReqParam(e) {
		let param = e.target.value
		let obj = {}
		//param = param.replace(/,/g, '&')
		param = param.replace(/\ /g, '&')
		this.setState({reqParam: param})
	}

	handleLoginState(e) {
		let check = e.target.checked
		if(check && this.state.token === '') {
			this.setState({isLogin: check, btnStatus: 'Login...'})
		} else {
			this.setState({isLogin: check, btnStatus: 'Request'})
		}
	}

	handleAccountType(e) {
		let accType = e.target.value

		if(accType !== this.state.accountType || accType === 'otherAcc') {
			this.setState({accountType: accType, btnStatus: 'Login...', 
				token: '', account: '', password: '', otherAccEnable: false, 
				notOther: (accType !== 'otherAcc')})

			this.handleLoginOperate( accType )
			clearInterval(this.state.interval)  // 清除自动登入
			let interval = setInterval( this.handleLoginOperate.bind(this, accType) , this.state.pollInterval ) //设置自动登入
			this.setState({interval: interval})
			
		}
	}

	handleAccount(e) {
 		let acc = e.target.value

 		this.setState({ account: acc, otherAccEnable: false, btnStatus: 'Login...' })
 	}

 	handlePassword(e) {
 		let pwd = e.target.value

 		this.setState({ password: pwd, otherAccEnable: false, btnStatus: 'Login...'})
 	}

 	handleOtherAccLogin() {
 		this.setState({otherAccEnable: true})
 		this.handleLoginOperate( 'otherAccManual' )
 	}

	componentWillReceiveProps(nextProps) {
		const { loginSuccess, token } = nextProps.apiState

		if(token !=='' && token !== null && 
			token !== undefined && token !== 'loginfailed' && token !== this.props.apiState.token) {
			this.setState({token: token, btnStatus: 'Request'})
		} else if(token == 'loginfailed') {
			this.setState({token: 'failed to login', btnStatus: 'Login...'})
			alert('Failed to login Tianzu')
		}
	}

	componentDidMount() {
		const { accountType } = this.state

		this.handleLoginOperate( accountType )
		let interval = setInterval( this.handleLoginOperate.bind(this, accountType) , this.state.pollInterval )  //自动登入
		this.setState({interval: interval})
	}

	handleLoginOperate( accountType ) {

		const { actions } = this.props
		const { account, password, otherAccEnable } = this.state	
		let url = 'http://test.eyaos.com/clogin'

		if(accountType == 'agency') {
			let param = {account: '135887042912', password: '123456'}
			actions.loginTianzu(url, param)
		} else if (accountType == 'invesManager') {
			let param = {account: '135887042913', password: '123456'}
			actions.loginTianzu(url, param)
		} else if (accountType == 'agenManag') {
			let param = {account: '135887042914', password: '123456'}
			actions.loginTianzu(url, param)
		}else if (accountType == 'enterprise') {
			let param = {account: '135887895432', password: '123456'}
			actions.loginTianzu(url, param)
		} else if (accountType == 'otherAcc' && otherAccEnable )  {
			let param = {account: account, password: password}
			actions.loginTianzu(url, param)
		} else if (accountType == 'otherAccManual') {
			let param = {account: account, password: password}
			actions.loginTianzu(url, param)
		}
	}

	urlCheck(reqUrl) {

		let hasProtocol = new RegExp('((http|ftp|https)://)', 'i')
		let urlReg = new RegExp('((http|ftp|https)://)' +  //协议
			'(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|'+
			'((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?))'+
			'(:[0-9]{1,4})*'+
			'(/[a-zA-Z0-9\&%_\./-]*)', 'i')

		if(hasProtocol.test(reqUrl)) {

			if(/www/i.test(reqUrl)) {
				alert('Sorry, just support test environment for now!!')
				return false
			} else {
				if(urlReg.test(reqUrl)) {
					return true
				} else {
					alert(' Wrong URL!!')
					return false
				}
			}
		} else {
			alert('Check the Url Protocol? "http|https|ftp" ')

			return false
		}
	}

	handleRequestSend() {
		const { actions } = this.props
		const { reqUrl, reqMethod, reqParam, isJson, btnStatus, testEnv, token } = this.state
		let isCors = ( testEnv === 'cors' ? true : false )  //是否跨域
		
		if( reqUrl === '' || reqUrl === null || reqUrl === undefined ) {
			alert('Request URL Can\'t be null')
		} else {
			if(this.urlCheck(reqUrl)) {

				if(reqMethod === 'GET' || reqMethod === 'HEAD' ) {
					actions.sendGetRequest(reqUrl, reqParam, isCors, token)
				} else {
					actions.sendNotGetRequest(reqMethod, reqUrl, reqParam, ( isJson ? 'JSON': '' ), isCors, token)
				}
			}
		}
	}


	render() {

		const { response } = this.props.apiState

		return (
			<div className="api-test">
				<Row>
					<Navbar className="api-test-nav">
						<Navbar.Header>
							<Navbar.Brand>
								<a>API TEST</a>
							</Navbar.Brand>
						</Navbar.Header>
						<Navbar.Collapse>
       					</Navbar.Collapse>
					</Navbar>
				</Row>
				<Row>
					<div className="api-test-container">
						<Row className='api-prepare'>
							<Col lg={2} md={3} xs={4} className="input-label">
								<span>ENV:</span>
							</Col>
							<Col lg={8} md={8} xs={7} className='input-value'>
								<select name="testEnv" id="testEnv" value={this.state.testEnv} 
									onChange={this.handleTestEnv.bind(this)}>
									<option value="test">测试环境(目前仅支持测试环境）</option>
									<option value="cors">外网跨域</option>
								</select>
							</Col>
						</Row>
						<Row className='api-prepare'>
							<Col lg={2} md={3} xs={4} className="input-label">
								<span>METHOD:</span>
							</Col>
							<Col lg={8} md={8} xs={7} className='input-value'>
								<select name="reqMethod" id="sendMethod" value={this.state.reqMethod}
									onChange={this.handleReqMethod.bind(this)}>
									<option value="GET">GET</option>
									<option value="POST">POST</option>
									<option value="PUT">PUT</option>
									<option value="DELETE">DELETE</option>
									<option value="PATCH">PATCH</option>
									<option value="HEAD">HEAD</option>
								</select>
							</Col>
						</Row>
						<Row className='api-prepare'>
							<Col lg={2} md={3} xs={4} className="input-label">
								<span>URL:</span>
							</Col>
							<Col lg={8} md={8} xs={7} className='input-value'>
								<input type="text" className='api-param'
									value={this.state.reqUrl} 
									onChange={this.handleReqUrl.bind(this)}
									placeholder=" e.g:  http://test.eyaos.com/clogin"/>
							</Col>
						</Row>
						<Row className='api-prepare'>
							<Col lg={2} md={3} xs={4} className="input-label">
								<span>PARAM:</span>
							</Col>
							<Col lg={1} md={2} xs={2} className='check-box'>
								<input type="checkbox" 
									checked={this.state.isJson}
									onChange={this.handleParamType.bind(this)}/>
								<span>Json?</span>
							</Col>

							<Col lg={7} md={6} xs={5} className='input-value'>
								<input type="text" className='type-text'
									value={this.state.reqParam} 
									onChange={this.handleReqParam.bind(this)}
									placeholder='e.g: name=lucy&age=30&arr=[1,2,3]&obj={"p1":"f","p2":"o"}&bool=true'/>
							</Col>
						</Row>
						<Row className='login-config'>
							<Col lg={2} md={3} xs={4} className="input-label">
								<span>LOGIN:</span>
							</Col>
							<Col lg={1} md={2} xs={2} className='check-box'>
								<input type="checkbox" 
									checked={this.state.isLogin}
									onChange={this.handleLoginState.bind(this)}/>
								<span>login?</span>
							</Col>
							<Col lg={7} md={6} xs={5} className='account-type input-value'>
								<select name="accountType" id="accountType" value={this.state.accountType}
									onChange={this.handleAccountType.bind(this)}>
									<option value='agency'>代理商</option>
									<option value='invesManager'>招商经理</option>
									<option value='agenManag'>代理&招商</option>
									<option value='enterprise'>企业号</option>
									<option value='otherAcc'>其他账号</option>
								</select>
							</Col>
						</Row>
						<Row className='login-config'>
							<Col lg={1} md={2} xs={1} className="input-label">
							</Col>
							<Col lg={4} md={4} xs={4} className='acc-pwd input-value'>
								<Row>
									<Col lg={4} md={5} xs={6}>
										<span>Account:</span>
									</Col>
									<Col lg={8} md={7} xs={6}>
										<input type="text" className='account'
											value={this.state.account} 
											onChange={this.handleAccount.bind(this)}
											disabled={this.state.notOther}/>
									</Col>
								</Row>
							</Col>
							<Col lg={4} md={4} xs={4} className='input-value acc-pwd'>
								<Row>
									<Col lg={4} md={5} xs={6} >
										<span>Password:</span>
									</Col>
									<Col lg={8} md={7} xs={6}>
										<input type='password' className='password'
											value={this.state.password} 
											onChange={this.handlePassword.bind(this)}
											disabled={this.state.notOther}/>
									</Col>
								</Row>
							</Col> 
							<Col lg={1} md={1} xs={2} className="input-label acc-pwd">
								<Button bsStyle='primary' bsSize='small' style={{float: 'right'}}
									disabled={ this.state.notOther }
									onClick={this.handleOtherAccLogin.bind(this)}>login</Button>
							</Col>
						</Row>
						<Row className='send-request'>
							<Button bsStyle='primary' bsSize='large' disabled={ this.state.btnStatus !== 'Request' }
								onClick={this.handleRequestSend.bind(this)}>{this.state.btnStatus}</Button>
						</Row>
						<Row>
							<Col lg={10} md={10} xs={10}>
								<div className="note">
									<h5><strong>参数填写说明：</strong></h5>
									<ul>
										<li>参数填写格式, 如：name1=value1&name2=value2</li>
										<li>选择json: 1、传递数组，纯数字, false, true字符串，请加“单引号”注明(如：acc='13588704291'&status='true') 否则按数字或bool型处理; <br/> 2、传递对象参数，请用JSON格式填写</li>
									</ul>
								</div>
							</Col>
						</Row>
						<Row>
							<h3 className='result-label'>Request:</h3>
							<Col lg={10} md={10} xs={10} className="content request">
								<span><strong>Method: </strong> { this.state.reqMethod } <strong>; URL: </strong> { this.state.reqUrl }
								<strong>; Param: </strong> { this.state.reqParam } <strong>; Token: </strong> { this.state.token } </span>
							</Col>
						</Row>
						<Row>
							<h3 className='result-label'>Response:</h3>
							<Col lg={10} md={10} xs={10} className="content response">
								<pre>{ response }</pre>
							</Col>
						</Row>
					</div>
				</Row>
			</div>
		)
	}
} 

function mapStateToProps(state) {
	return({
		apiState: state.interfaceReducer
	})
}

function mapDispatchToProps(dispatch) {
	return ({
		actions: bindActionCreators(interfaceActions, dispatch)
	})
}

ApiTest = connect(
	mapStateToProps,
	mapDispatchToProps
)(ApiTest)

export default ApiTest