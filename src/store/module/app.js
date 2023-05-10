import {produce} from 'immer'
// const newData = produce(oldState, (newState) =>{})

const initState = {
    size: 'middle'
}

function reducer(state = initState, action){
    // store操作流程：
    // 1.当信号到达时，对state进行深拷贝
    // 2.根据action中的type和payload对老的state进行操作
    // 3.返回修改后最新的state

    // console.log('收到信号了', action)

    return produce(state, (newState) =>{
        // 进行其他操作
        // if(action.type === 'APP_SIZE_ADD'){
        //     newState.size += action.payload 
        // }
        switch (action.type){
            case "APP_SIZE_ADD":
                newState.size += action.payload 
                break;
            case "APP_SIZE_SUB":
                    newState.size -= action.payload 
                    break
            case "APP_SIZE":
                newState.size = action.payload 
                console.log(newState.size)
                break
            default:
        }

    })
}

export default reducer