import { useSelector,useDispatch } from "react-redux"


function Goods(){
    let {size} = useSelector(state => state.app)
    const dispatch = useDispatch()

    const addFun =()=>{
        dispatch({type:"APP_SIZE_ADD",payload:1})
    }
    const subFun =()=>{
        dispatch({type:"APP_SIZE_SUB",payload:1})
    }
    return (
        <div>
            <h2>商品列表</h2>
            <p>{size}</p>
            <button onClick={addFun}>+1</button>
            <button onClick={subFun}>-1</button>
        </div>
    )
}

export default Goods