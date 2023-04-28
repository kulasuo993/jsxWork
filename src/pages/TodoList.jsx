import React,{useState} from "react";
import './TodoList.css'

function TodoList(){
    let [message,SetMessage] = useState('')
    let [checkNum,setCheckNum] = useState(0)
    let [All,setAll] = useState('')
    let [showPop,setShowPop] = useState(true)
    let [showPop1,setShowPop1] = useState(false)
    let [list,setList] = useState([
        {
            name:'吃饭',
            id:1,
            ischeck:false
        }
        ,
        {
            name:'睡觉',
            id:2,
            ischeck:false
            
        },
        {
            name:'打豆豆',
            id:3,
            ischeck:false
        },
        {
            name:'敲代码',
            id:4,
            ischeck:false
        },
    ])
    let [list1,setList1] = useState([])

    //顶部视图
    const Title =(props)=>{
        return(
            <div>
                <h3>{props.name}</h3>
                <input 
                    type="text"
                    value={message} 
                    onChange={e => getMessage(e)}
                    placeholder="请输入你的任务名称"
                    className="input"
                />
                <button onClick={()=>{addFun()}} className="btnChoose">确认</button>
            </div>
        )
    }
    //列表视图
    const List = (props)=>{
        return(
            <div>
                <ul className="list">
                    {
                        props.list.map(item =>{
                            return <li key={item.id}>
                                        <input type="checkbox" checked={item.ischeck} onChange={()=>{itemCheck(item,list)}} />
                                        <p>{item.name}</p>  
                                        <button onClick={()=>{
                                            deleteFun(item.id,item)
                                        }}>删除</button>
                                    </li>
                        })
                    }
                </ul>
            </div>
        )
      
    }
    //底部视图
    const Bottom = (props) =>{
        return(
            <div className="num">
                <input type="checkbox" checked={All} className="ALLcheck" onChange={()=>{AllCheck(list)}}/>
                <span >已完成{checkNum}/全部{list.length}</span>
            </div>
        )
    }
    //按钮视图
    const Btn = (props)=>{
        return(
            <div className="btn">
                <button onClick={()=>{show()}}>显示已完成任务</button>
                <button onClick={()=>{show1()}}>显示全部</button>
                <button onClick={()=>{deleteHas()}}>清除已完成任务</button>
            </div> 
        )
    }
    //num计算属性多次调用方法
    const numCount =()=>{
        list.forEach(item =>{
            let num = 0
            if(item.ischeck === true){
                num++
            }
            setCheckNum(checkNum = num)
        })
    }
    //输入框V-model
    const getMessage = (e)=>{
        SetMessage(message => e.target.value)
    }
    //输入框添加按钮
    const addFun = ()=>{
        let obj = {
            id: list.length+1,
            name: message,
            ischeck: false
        }
        setList(list => [...list, obj])
        numCount()
        if(checkNum === list.length+1||list.length===0){
            setAll(All = '1')
        }else{
            setAll(All = '')
        }
    }
   
    //列表每一项按钮功能
    const itemCheck = (data) =>{
    console.log(data)
    data.ischeck = !data.ischeck
    numCount()
    if(checkNum === list.length||list.length===0){
        setAll(All = '1')
    }else{
        setAll(All = '')
    }
    }

    //全选按钮功能
    const AllCheck = () =>{
    if(All === ''){
        setAll(All = '1')
        list.forEach(item =>{
            item.ischeck = true
        })
        setCheckNum(checkNum = list.length)
    }else{
        setAll(All = '')
        list.forEach(item =>{
            item.ischeck = false
        })
        setCheckNum(checkNum = 0)
    }
    }
    //删除按钮功能
    const deleteFun = (id,data)=>{
    setList(list => list.filter(item => item.id !== id)) 
    console.log(data)
    data.ischeck = false
    numCount()
    if(checkNum === list.length-1||list.length===0){
        setAll(All = '1')
    }else{
        setAll(All = '')
    }
    }
    //已完成任务按钮 切换至“已完成任务”
    const show = () =>{
    setShowPop(showPop = false)
    setShowPop1(showPop1 = true)
    list1.length = 0
    list.forEach(item =>{
        if(item.ischeck === true){
            setList1(list1 =>[...list1,item])
        }
    })
    }
    //显示全部按钮
    const show1 = () =>{
    setShowPop(showPop = true)
    setShowPop1(showPop1 = false)
    }
    
    //清除已完成任务按钮
    const deleteHas = ()=>{
    list.forEach(item =>{
        if(item.ischeck === true){
            setList(list => list.filter(ite => ite.id !== item.id)) 
        }
    })
    setCheckNum(checkNum = 0)
    }

    return(
        <div className="box">
            <div style={{display:showPop ?'block':'none'}}>
                <Title name='任务列表'></Title>
                <List list={list}></List>
                <Bottom></Bottom>
            </div>

            <div style={{display:showPop1 ?'block':'none'}}>
                <h3>已完成列表</h3>
                <List list={list1}></List>
            </div>

            <Btn></Btn>
        </div>
    )
}



export default TodoList