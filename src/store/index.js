import { createStore, combineReducers, applyMiddleware } from "redux";
import app from './module/app'
import user from './module/user'
import list from './module/list'

const reducer =  combineReducers({
    app,
    user,
    list
})


// 管理员
const store = createStore(reducer)

console.log(store.getState())

export default store