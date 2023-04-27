import React,{useState} from "react";
import './TodoList.css'

function TodoList(){
    let [message,SetMessage] = useState('')
    let [checkNum,setCheckNum] = useState(0)
    // let [checkNum1,setCheckNum1] = useState(0)
    let [All,setAll] = useState('')
    // let [All1,setAll1] = useState('')
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
    const getMessage = (e)=>{
        SetMessage(message => e.target.value)
    }
    const addFun = ()=>{
        let obj = {
            id: list.length+1,
            name: message,
            ischeck: false
        }
        setList(list => [...list, obj])
        let num = 0
        list.forEach(item =>{
            if(item.ischeck === true){
                num++
            }
            setCheckNum(checkNum = num)
        })
        if(checkNum === list.length+1||list.length===0){
            setAll(All = '1')
        }else{
            setAll(All = '')
        }
    }
   
     const itemCheck = (data) =>{
        console.log(data)
        let num = 0
        data.ischeck = !data.ischeck
        list.forEach(item =>{
            if(item.ischeck === true){
                num++
            }
            setCheckNum(checkNum = num)
        })
        console.log(num,checkNum,list.length)
        if(checkNum === list.length||list.length===0){
            setAll(All = '1')
        }else{
            setAll(All = '')
        }
     }
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

    //  const itemCheck1 = (data) =>{
    //     console.log(data)
    //     let num = 0
    //     data.ischeck = !data.ischeck
    //     list1.forEach(item =>{
    //         if(item.ischeck === true){
    //             num++
    //         }
    //         setCheckNum1(checkNum1 = num)
    //     })
    //     console.log(num,checkNum,list.length)
    //     if(checkNum1 === list1.length||list1.length===0){
    //         setAll1(All1 = '1')
    //     }else{
    //         setAll1(All1 = '')
    //     }
    //  }
    //  const AllCheck1 = () =>{
    //     if(All1 === ''){
    //         setAll1(All1 = '1')
    //         list1.forEach(item =>{
    //             item.ischeck = true
    //         })
    //         setCheckNum1(checkNum1 = list1.length)
    //     }else{
    //         setAll1(All1 = '')
    //         list1.forEach(item =>{
    //             item.ischeck = false
    //         })
    //         setCheckNum1(checkNum1 = 0)
    //     }
    //  }
     const deleteFun = (id,data)=>{
        setList(list => list.filter(item => item.id !== id)) 
        console.log(data)
        let num = 0
        data.ischeck = false
        list.forEach(item =>{
            if(item.ischeck === true){
                num++
            }
            setCheckNum(checkNum = num)
        })
        if(checkNum === list.length-1||list.length===0){
            setAll(All = '1')
        }else{
            setAll(All = '')
        }
     }
     const show = () =>{
        setShowPop(showPop = false)
        setShowPop1(showPop1 = true)
        list1.length = 0
        list.forEach(item =>{
            if(item.ischeck === true){
                setList1(list1 =>[...list1,item])
            }
        })
        console.log(list1)
       
     }
     const show1 = () =>{
        setShowPop(showPop = true)
        setShowPop1(showPop1 = false)
       
     }
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
                <h3>任务列表</h3>
                <input 
                    type="text"
                    value={message} 
                    onChange={e => getMessage(e)}
                    placeholder="请输入你的任务名称"
                    className="input"
                />
                <button onClick={()=>{addFun()}} className="btnChoose">确认</button>
                <ul className="list">
                    {
                        list.map(item =>{
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
                <div className="num">
                    <input type="checkbox" checked={All} className="ALLcheck" onChange={()=>{AllCheck(list)}}/>
                    <span >已完成{checkNum}/全部{list.length}</span>
                </div>
               
            </div>

            <div style={{display:showPop1 ?'block':'none'}}>
                <h3>已完成列表</h3>
                <ul className="list">
                    {
                        list1.map(item =>{
                            return <li key={item.id}>
                                        <input type="checkbox" checked={item.ischeck} onChange={()=>{itemCheck(item,list)}} />
                                        <p>{item.name}</p>  
                                        {/* <button onClick={()=>{
                                            deleteFun(item.id,item)
                                        }}>删除</button> */}
                                    </li>
                        })
                    }
                </ul>
                {/* <input type="checkbox" checked={All1} className="ALLcheck" onChange={()=>{AllCheck1(list1)}}/>
                <span >已完成{checkNum1}/全部{list1.length}</span> */}
            </div>
            <div className="btn">
                    <button onClick={()=>{show()}}>显示已完成任务</button>
                    <button onClick={()=>{show1()}}>显示全部</button>
                    <button onClick={()=>{deleteHas()}}>清除已完成任务</button>
            </div>    
        </div>
    )
}



export default TodoList