import { combineReducers } from 'redux'
import interfaceReducer from './tianzu/interfaceReducer.js'
import regressionReducer from './tianzu/regressionReducer.js'

const rootReducer = combineReducers ({
	interfaceReducer,
	regressionReducer
})

export default rootReducer