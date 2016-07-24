import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Navbar, Table, Button } from 'react-bootstrap/lib'
import * as regressionActions from '../../actions/tianzu/regressionActions.js'

import './apiRegression.less'

class ApiRegression extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            btnInfo: 'tocheck',
            token: '',
            regBtnName: '一键回归',
            logout: {},
            perOfPassed: '0%',
            isFinished: false
        })
    }

    loadApiFile() {
        const {
            actions
        } = this.props
        let fileLocation = './resource/api.json'
        actions.loadFileRequest('GET', fileLocation)
    }

    loginTianzu() {
        const {
            actions
        } = this.props

        let url = 'http://test.eyaos.com/clogin'
        let reqParam = 'account=135887042914&password=123456'
        actions.getLoginToken(url, reqParam)
    }

    handleApiStatusClear() {
        const { clearApiStatus } = this.props.actions
        console.log('in handleApiStatusClear')
        this.setState({isFinished: false})
        clearApiStatus()
        this.loginTianzu()

    }

    componentWillMount() {
        console.log('in componentWillMount')
        const { apiMap, apiCnt } = this.props.apiList
        const { clearApiStatus } = this.props.actions

        this.loadApiFile()
        this.setState({
            apiArrSize: apiMap
        })
        clearApiStatus()
    }

    componentDidMount() {

        if (this.state.token === '' || this.state.token === null ||
            this.state.token === undefined || this.state.regBtnName === '回归结束') {
            this.loginTianzu()
        }
    }

    componentWillReceiveProps(nextProps) {
        const { actions, apiList } = this.props
        const { token, apiCnt, apiMap, passedCnt } = nextProps.apiList
        const { logout } = this.state

        if (token !== this.state.token) {
            this.setState({
                token: token
            })
        }

        if (apiMap.size > 0) {
            let passPer = (passedCnt / apiMap.size * 100).toFixed(2)
            this.setState({
                perOfPassed: (passPer.toString() + '%')
            })
        }


        if (apiCnt === 0) {
            this.setState({
                regBtnName: '一键回归'
            })
        } else if (apiCnt > 0 && apiCnt < apiMap.size - 1) {
            this.setState({
                regBtnName: apiCnt
            })
        } else if (apiCnt == apiMap.size - 1) {
            //将退出登入放到最后回归
            actions.normalRequest(logout.method, logout.apiUrl, logout.apiParam, logout.paramType, logout.index, this.state.token)
        } else if (apiCnt == apiMap.size && this.state.isFinished === false) {
            this.setState({
                regBtnName: '回归结束',
                isFinished: true
            })
            this.loginTianzu()
        } else {
            console.log('regression is finished')
        }
    }

    handleSingleApiRequest(method, url, param, paramType, index) {
        const { singleApiRequest} = this.props.actions

        singleApiRequest(method, url, param, paramType, index, this.state.token)
    }

    handleAllApiRequest() {
        console.log('in handleAllApiRequest')
        const {
            apiList,
            actions
        } = this.props

        if (apiList.statusCleared) {
            if (apiList.apiMap == null && apiList.apiMap.size == 0) {
                alert('API array is null')
                return
            }

            this.setState({
                regBtnName: apiList.apiCnt
            })

            let apiArr = [...apiList.apiMap.values()]

            //提取退出登入API
            for (let i = 0; i < apiArr.length; i++) {
                if (/logout/i.test(apiArr[i].apiUrl)) {
                    this.setState({
                        logout: apiArr[i]
                    })
                    apiArr.splice(i, 1)
                    break
                }
            }
            apiArr.map((item, index) => {
                setTimeout(actions.normalRequest.bind(this,
                        item.method, item.apiUrl, item.apiParam, item.paramType, item.index, this.state.token), 200)
                    // actions.normalRequest(item.method, item.apiUrl, item.apiParam, item.paramType, item.index, this.state.token)
            })
        } else {
            alert('请先清空状态！！')
        }
    }

    handleFrontFailedApi() {

        this.props.actions.frontFailedApi()
    }

    tableRender(apiArr, frontFailed) {
        let apiArrTmp = []
        if (frontFailed) {
            apiArr.map((item, index) => {
                if (item.status < 200 || item.status > 299) {
                    apiArrTmp.push(item)
                }
            })
        } else {
            apiArrTmp = apiArr
        }

        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>回归</th>
                    <th>备注</th>
                </tr>
                </thead>
                <tbody>

                { apiArrTmp.map ((item, index) => (
                    <tr key={index}>
                        <td>{ item.apiNo }</td>
                        <td>{ item.apiName }</td>
                        <td>
                            <Button bsSize='xsmall' bsStyle={
								( item.status >= 200 && item.status < 300 ) ? 'success' : (
									( item.status > 699 ) ? 'warning' : (
									( item.status == null || item.status == undefined || item.status == '' ) ? 'info' : 'danger' )) }
                                    className='reg-btn'
                                    onClick={this.handleSingleApiRequest.bind(
									this, item.method, item.apiUrl, item.apiParam, item.paramType, item.index)}>
                                { item.status || '???' }
                            </Button>
                        </td>
                        <td>
                            { item.remark }
                        </td>
                    </tr>))}
                </tbody>
            </Table>
        )
    }

    render() {

        const { apiMap, apiCnt, frontFailed, passedCnt, token } = this.props.apiList

        return (
            <div className="api-regression">
                <Row>
                    <Navbar className="api-regression-nav">
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a>API REGRESSION</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Navbar.Collapse>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
                <Row>
                    <div className='api-reg-ctl'>
                        <div> { 'PASSED API: ' + passedCnt + '/' +
                        ( apiMap == null ? 0 : apiMap.size ) + '; ' + this.state.perOfPassed } </div>

                        <Button bsSize='large' bsStyle='primary'
                                onClick={this.handleAllApiRequest.bind(this)}
                                disabled={ !token }>
                            { this.state.regBtnName }
                        </Button>
                        <Button bsSize='large' bsStyle='primary'
                                onClick={ this.handleApiStatusClear.bind(this) }>
                            清空状态
                        </Button>
                        <Button bsSize='large' bsStyle='primary'
                                onClick={ this.handleFrontFailedApi.bind(this) }>
                            失败API
                        </Button>
                    </div>
                    <div className="api-reg-con">
                        <div className='table-container'>
                            { apiMap ? this.tableRender ([...apiMap.values ()], frontFailed) : <h1>null</h1> }
                        </div>
                    </div>
                </Row>
            </div>

        )
    }
}

ApiRegression.propTypes = {
    apiList: PropTypes.object
}

ApiRegression.defaultProps = {
    apiList: [{
        apiNo: '一',
        apiName: '登录接口',
        method: 'POST',
        apiUrl: 'http://test.eyaos.com/clogin',
        apiParam: 'account=121885763253&password=123456',
        remark: '(POST)',
        state: ''
    }, {
        apiNo: '二',
        apiName: '退出登录',
        method: 'GET',
        apiUrl: 'http://test.eyaos.com/clogout',
        apiParam: '',
        remark: '登录用户(GET)',
        state: ''
    }, {
        apiNo: '三',
        apiName: '我关注的适应症',
        method: 'GET',
        apiUrl: 'http://test.eyaos.com/user/api/ind/follow ',
        apiParam: '',
        remark: '登录用户(GET)',
        state: ''
    }]
}

function mapStateToProps(state) {
    return ({
        apiList: state.regressionReducer
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators(regressionActions, dispatch)
    })
}

ApiRegression = connect(
    mapStateToProps,
    mapDispatchToProps
)(ApiRegression)

export default ApiRegression