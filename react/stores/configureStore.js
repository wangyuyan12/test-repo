import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

const createStoreWithMiddleware = applyMiddleware (
	thunkMiddleware
)(createStore)

function configureStore(initState) {
	 const store = createStoreWithMiddleware(rootReducer, initState)

	 return store
}

/*function configureStore(initState) {
	
	console.log('configureStore' + initState)
	return createStore(rootReducer, initState)   //initial create
}*/


export default configureStore