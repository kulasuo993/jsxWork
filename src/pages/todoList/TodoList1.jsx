import React,{useState,useEffect} from "react";
import './TodoList2.css'
import { useSelector,useDispatch } from "react-redux";

//添加功能视图
function Title(props){
    let [message,setMessage] = useState('')
    const{addTodo} = props

    const getMessage = (e)=>{
        setMessage(message => e.target.value)
    }
    const add = ()=>{
        let arr = {
            name:message,
            id:Date.now(),
            ischeck: false
        }
        setMessage('')
        addTodo(arr)
    }
    return(
        <div>
            <h3>todoList</h3>
            <input 
                type="text"  
                value={message}
                onChange={e => getMessage(e)}
                placeholder="请输入你的任务名称"
                className="input"
            />
            <button onClick={()=>{add()}} className="btnChoose">确认</button>
        </div>
    )
}

//列表视图
function List(props){
    let {list,deleteItem,itemCheckFun} = props
    const itemCheck = (item) =>{
        itemCheckFun(item.ischeck,item.id,item)
    }
    const deleteFun = (data,id)=>{
        deleteItem(data,id)
    }
    return(
        <div>
            <ul className="list">
                {
                    list.map(item =>{
                        return <li key={item.id}>
                            <input type="checkbox" checked={item.ischeck} onChange={()=>{itemCheck(item)}} />
                            <p>{item.name}</p>  
                            <button onClick={()=>{
                                deleteFun(item.ischeck,item.id)
                            }}>删除</button>
                        </li>
                    })
                }
               </ul>
        </div>
    )
}

//底部视图
function Bottom(props){
    let {list, all, changeAll} = props
    // 已完成
    const doneTotal = list.reduce((pre, item) => pre + (item.ischeck ? 1 : 0), 0)
    // 总数
    const totol = list.length
    //全选按钮功能
    const AllCheck = (e) =>{
        changeAll(e.target.checked)
    }
    return(
        <div className="num">
            <input type="checkbox" checked={all} className="ALLcheck" onChange={(e)=>{AllCheck(e)}}/>
            <span >已完成{doneTotal}/全部{totol}</span>
        </div>
    )
}

//按钮视图
function Btn(props){
    let {filterData} = props

    const show = (type)=>{
        filterData(type)
    }
   return(
        <div className="btn">
            <button onClick={()=>{show('completed')}}>显示已完成任务</button>
            <button onClick={()=>{show('all')}}>显示全部</button>
            <button onClick={()=>{show('clear')}}>清除已完成任务</button>
        </div> 
    )
}

function TodoList(){
    let {list} = useSelector(state=>state.list)
    let [todoList, setTodoList] = useState([])
    let [All,setAll] = useState(false)
    const dispatch = useDispatch()
    let abc = [...list]
    console.log(abc)
    //添加功能
    const confirmAdd = (arr)=>{
        dispatch({type:"LIST_PUSH",payload:arr})
        const checkLength = list.filter(item=>item.ischeck).length;
        console.log(checkLength,list.length)
        setAll(false) 
    }

    //单选
    const itemCheck = (data,id,item) =>{
        const checkLength = list.filter(item=>item.ischeck).length;
        console.log(checkLength)
        if(checkLength === list.length-1){
            setAll(true) 
        }else{
            setAll(false) 
        }
        dispatch({type:"ITEM_CHECK",payload:{data,id}})
        console.log(item)
    }

   //删除功能
    const FunDelete = (data,id)=>{
        dispatch({type:"LIST_DELETE",payload:id})
        const checkLength = list.filter(item=>item.ischeck).length;
      
        list.forEach(item => {
            if(item.ischeck === true){
                if(checkLength === list.length){
                    setAll(true) 
                }else{
                    setAll(false) 
                }
            }else{
                if(checkLength+1 === list.length){
                    setAll(true) 
                }else{
                    setAll(false) 
                }
            }
        });
        console.log(checkLength,list.length)
       
        // dispatch({type:"ITEM_CHECK",payload:{data,id}})
    }

    // 全选
    const changeAllFun = (checked)=>{
        setAll(checked)   
        dispatch({type:"ALL_CHECK",payload:checked})
    }

      // 过滤
      const filterFun = (type)=>{
        if(type === 'completed'){
            let tempArry = list.filter(item => item.ischeck === true)
            dispatch({type:"FILTER_ONE",payload:tempArry})
            setTodoList(tempArry) 
        }

        else if(type === 'all'){
            let tempArry = [...list]
            dispatch({type:"FILTER_TWO",payload:tempArry})
            setTodoList(tempArry) 
        }
        
        else if(type === 'clear'){
            let tempArry = list.filter(item => item.ischeck === false)
            dispatch({type:"FILTER_ONE",payload:tempArry})
            setTodoList(tempArry) 
        }
    }

    useEffect(() => {
        let temp = [...list]
        setTodoList(temp)
    }, [list])
    
    return(
        <div className="box">
            <div>
                <Title addTodo={confirmAdd}></Title>
                <List list={todoList} deleteItem={FunDelete} itemCheckFun={itemCheck}></List>
                <Bottom list={todoList} all={All}  changeAll={changeAllFun}></Bottom>
                <Btn filterData={filterFun}></Btn>
            </div>

          
        </div>
    )
}



export default TodoList