import {produce} from 'immer'

const initState = {
    size:1,
    list:[
        {
            name:'吃饭',
            id:Date.now()-11,
            ischeck:false
        }
        ,
        {
            name:'睡觉',
            id:Date.now()-21,
            ischeck:false
            
        },
        {
            name:'打豆豆',
            id:Date.now()-31,
            ischeck:false
        },
        {
            name:'敲代码',
            id:Date.now()-41,
            ischeck:false
        },
    ],
    list2:[],
    list3:[]
}

function reducer(state = initState,action){
    return produce(state,(newState)=>{
        switch(action.type){
            case "APP_SIZE_ADD":
                newState.size += action.payload
                break;
            case "APP_SIZE_SUB":
                newState.size -= action.payload 
                break;
            case "LIST_PUSH":
                newState.list.push(action.payload) 
                break;   
            case "LIST_DELETE":
                newState.list.length = 0
                let arr = state.list.filter(item=>item.id !== action.payload)
                for(let i = 0 ; i<arr.length ; i++){
                    newState.list.push(arr[i])
                }
                break; 
            case "ITEM_CHECK":
                for(let i = 0 ; i<state.list.length ; i++){
                   if(state.list[i].id === action.payload.id){
                    newState.list[i].ischeck = !action.payload.data
                   }
                }
                break; 
            case "ALL_CHECK":
                for(let i = 0 ; i<state.list.length ; i++){
                    newState.list[i].ischeck = action.payload 
                }
                break;
            case "FILTER_ONE":
                newState.list.length = 0
                newState.list2.length = 0
                console.log(action.payload)
                for(let i = 0 ; i<action.payload.length ; i++){
                    newState.list2.push(action.payload[i])
                }
                    newState.list.push(...newState.list2)
                break;   
            case "FILTER_TWO":
                newState.list.length = 0
                for(let i = 0 ; i<state.list.length; i++){
                    newState.list.push(action.payload[i])
                }
                break;  
            case "FILTER_THREE":
                newState.list.length = 0
                for(let i = 0 ; i<action.payload.length; i++){
                    newState.list.push(action.payload[i])
                }
                break; 
            default:
        }
    })
}

export default reducer