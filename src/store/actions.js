import { fetchLogin } from "@/api/user"

export function switchAdd(payload){
    return {type: "APP_SIZE_ADD",payload: payload}
}

export function switchSub(payload){
    return {type: "APP_SIZE_SUB",payload: payload}
}

export function switchSize(payload){
    return {type: "APP_SIZE",payload: payload}
}


// 写一个异步的action creater
export function login(data) {
   return function(dispatch){
    fetchLogin(data).then(res => {
        dispatch({type: 'USER_LOGIN', payload: res})
        console.log(res)
    })
   } 
}

  
export function resetUser() {
    return { type: "USER_RESET", payload: null }
}