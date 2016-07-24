import {
    REG_NORMALREQUEST,
    REG_NORMALRESPONSE,
    REG_LOADFILEREQUEST,
    REG_LOADFILERESPONSE,
    REG_LOGINREQUEST,
    REG_LOGINRESPONSE,
    REG_CLEARSTATUS,
    REG_GETFAILEDAPI,
    REG_SINGLEREQUEST,
    REG_SINGLERESPONSE
}
    from '../../constants/tianzu/tianzuTypes.js'

let initState = {
    apiMap: new Map(),
    loadApi: false,
    token: null,
    apiCnt: 0,
    passedCnt: 0,
    statusCleared: true,
    frontFailed: false
}

let arrToMap = ( apiArray ) => {
    let arrMap = new Map()
    try {
        apiArray = JSON.parse( apiArray )

        if( apiArray.constructor.toString().indexOf( "Array" ) < 0 ||
            apiArray.length === 0 || apiArray === undefined || apiArray === null ) {
            console.log( 'failed to load api array' )
            return null
        } else {
            apiArray.map( ( item, index ) => (
                arrMap.set( index, Object.assign( {}, item, { index: index } ) )) )
            return arrMap
        }
    } catch( err ) {
        console.log( 'api array is not in JSON Format' + err.toString() )
        return null
    }
}

let getRespStatus = ( data, status ) => {
    if( status >= 200 && status < 300 ) {
        try {
            JSON.parse( data )  //判断是否为JOSN格式
            return status
        } catch( err ) {
            if( /<!DOCTYPE html>/i.test( data ) ) {  //判断是否为HTML格式
                return status
            } else {
                return 701  //都不是，status设为701
            }
        }
    } else {
        return status
    }
}

export default function regressionReducer( state = initState, action ) {

    switch( action.type ) {

        case REG_LOADFILEREQUEST:
            return (Object.assign( {}, state, {
                loadApi: false
            } ))
            break

        case REG_LOADFILERESPONSE:
            return (Object.assign( {}, state, { apiMap: arrToMap( action.data ) }, { loadApi: true } ))
            break

        case REG_LOGINREQUEST:
            return (Object.assign( {}, state, {
                token: null
            } ))
            break

        case REG_LOGINRESPONSE:
            try {
                let data = JSON.parse( action.data )
                let token = data.token || 'failed to login'
                return (Object.assign( {}, state, { token: data.token } ))
            } catch( err ) {
                return (Object.assign( {}, state, { token: null } ))
            }
            break

        case REG_NORMALREQUEST:
            return state
            break

        case REG_NORMALRESPONSE:
            let apiMapTmp = state.apiMap
            let statusTmp = getRespStatus( action.data, action.status )
            let apiObj = Object.assign( {}, apiMapTmp.get( action.index ), { status: statusTmp } )
            apiMapTmp.set( action.index, apiObj )
            return Object.assign( {}, state, { apiMap: apiMapTmp }, { apiCnt: state.apiCnt + 1 }, { statusCleared: false }, {
                passedCnt: ((statusTmp >= 200 && statusTmp < 300) ? state.passedCnt + 1 : state.passedCnt)
            } )
            break

        case REG_SINGLEREQUEST:
            return state
            break

        case REG_SINGLERESPONSE:
            apiMapTmp = state.apiMap
            statusTmp = getRespStatus( action.data, action.status )
            apiObj = Object.assign( {}, apiMapTmp.get( action.index ), { status: statusTmp } )
            apiMapTmp.set( action.index, apiObj )
            return Object.assign( {}, state, { apiMap: apiMapTmp }, { statusCleared: false } )
            break

        case REG_CLEARSTATUS:
            let apiMapC = state.apiMap
            for( let key of apiMapC.keys() ) {
                apiMapC.set( key, Object.assign( {}, apiMapC.get( key ), { status: '' } ) )
            }
            return Object.assign( {}, state, { apiMap: apiMapC }, { apiCnt: 0 },
                { passedCnt: 0 }, { statusCleared: true } )

        case REG_GETFAILEDAPI:
            return Object.assign( {}, state, {
                frontFailed: !state.frontFailed
            } )

        default:
            return state
    }
}