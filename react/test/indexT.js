import configureStore from '../stores/configureStore.js' 
import { loginTianzu } from '../actions/tianzu/interfaceActions.js'

let store = configureStore()

let url = 'http://test.eyaos.com/clogin'
let param = { account: '135887895432', password: '123456'}
store.dispatch(loginTianzu(url, param))
