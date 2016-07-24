import React, {Component} from 'react'
import {render} from 'react-dom'
import configureStore from '../stores/configureStore'
import PageRoute from './QaHome.js'
import './index.less'

let store = configureStore ()

render (
    PageRoute,
    document.getElementById ('index-page')
)