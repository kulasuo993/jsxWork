import {produce} from 'immer'

const initState = {
    size:1
}

function reducer(state = initState,action){
    return produce(state,(newState)=>{
        switch(action.type){
            case "APP_SIZE_ADD":
                newState.size += action.payload
                break;
            case "APP_SIZE_SUB":
                newState.size -= action.payload 
                break
            default:
        }
    })
}

export default reducer