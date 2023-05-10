import { produce } from 'immer'

const initState = {
    token: localStorage.getItem("token") || null,
    roles:[],
    accessRoutes: []
}

function reducer(state = initState , {type,payload}){
    return produce(state,newState=>{
        switch(type){
            case "USER_LOGIN":
                const { role_ids,token} = payload;
                newState.token = token;
                newState.roles = role_ids;
                localStorage.setItem("token",token)
                break;
            case "USER_PERMISSION":
                newState.accessRoutes = payload;
                break;
            case "USER_RESET":
                localStorage.removeItem("token")
                newState.token = "";
                newState.roles = [];
                break   
        default:        
        }
    })
}

export default reducer