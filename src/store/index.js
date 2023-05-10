import { createStore, combineReducers, applyMiddleware , compose} from "redux";
import app from './module/app'
import user from './module/user'
import list from './module/list'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const reducer =  combineReducers({
    app,
    user,
    list
})


// 管理员
// compose(applyMiddleware(thunk),applyMiddleware(logger))
// 管理员
const store = createStore(reducer,compose(applyMiddleware(thunk),applyMiddleware(logger)))

export default store