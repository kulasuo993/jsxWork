import { createStore, combineReducers, applyMiddleware , compose} from "redux";
import app from './module/app'
import user from './module/user'
import list from './module/list'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { persistStore, persistReducer } from 'redux-persist';
//  存储机制，可换成其他机制，当前使用sessionStorage机制
import storage from 'redux-persist/lib/storage/session';


const reducer =  combineReducers({
    app,
    user,
    list
})

const storageConfig = {
    key: 'root', // 必须有的
    storage: storage, // 缓存机制
}

const myPersistReducer = persistReducer(storageConfig, reducer);

// const store = createStore(myPersistReducer);
// 管理员
// compose(applyMiddleware(thunk),applyMiddleware(logger))
// 管理员
const store = createStore(myPersistReducer,compose(applyMiddleware(thunk),applyMiddleware(logger)))

export const persistor = persistStore(store);
export default store