import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import './leftNav.less'

class LeftNav extends Component {
    constructor (props) {
        super (props)

    }

    renderNavList (navList) {
        return navList.map ((item, index) => (
            <li key={index}>
                <Link to={`${item.itemAction}`}>
                    {item.itemName}
                </Link>
            </li>
        ))
    }

    render () {
        const {navList} = this.props

        return (
            <div className="nav-left">
                <div className="nav-header">
                    <a className='nav-brand' href='./index.html'>
                        天猪测试<br/>小站
                    </a>
                </div>
                <div className="nav-content">
                    <ul>
                        {this.renderNavList (navList)}
                    </ul>
                </div>
            </div>
        )
    }

}

LeftNav.propTypes = {
    navList: PropTypes.array
}

LeftNav.defaultProps = {
    navList: [
        {itemName: 'test', itemAction: '/test'},
        {itemName: 'test', itemAction: '/test'}
    ]
}

export default LeftNav