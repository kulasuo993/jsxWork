import React,{ useState } from 'react'
import "./style.scss"

function Title(props){
    let [message,setMessage] = useState('')
    const {addtodo,onCancle} = props
    //输入框V-model
    const getMessage = (e)=>{
        setMessage(message => e.target.value)
    }

    //输入框添加按钮
    const confirmAdd = ()=>{
        addtodo(message)
        setMessage(message => '')
    }

    return(
        <div>
            <h3>{props.name}</h3>
            <div onClick={onCancle} className='x'>x</div>
            <input 
                type="text"
                value={message}
                onChange={e => getMessage(e)}
                placeholder="请输入你的任务名称"
                className="input"
            />
            <button onClick={()=>{confirmAdd()}} className="btnChoose">确认</button>
        </div>
    )
}

function Modal(props){
  let {children, visiable, onCancle} = props

  // 遮罩层点击
  const handelLayer = (e)=>{
    if(e.target.dataset.self === 'layer'){
      onCancle()
    }
  }

  return (
    <div>
      <div className="ml-layer" style={{display: visiable ? 'block': 'none'}} data-self="layer" onClick={(e)=>{handelLayer(e)}}>
        <div className="ml-modal">
          <main>
              {children}
          </main>
        </div>
      </div>
    </div>
  ) 
}



function PageA(props) {
  let [visiable, setVisiable] = useState(false)
  const {addtodo} = props
  const submitFun = ()=>{
    setVisiable(true)
  }
  const addFun = (str)=>{
    addtodo(str)
    setVisiable(false)
  }
  return (
    <div>
      <button onClick={()=>{setVisiable(true)}}>open modal</button>
      <Modal
        title={<span style={{color:'blue'}}>添加todolist</span>}
        closeable
        visiable={visiable}
        onCancle={()=>{setVisiable(false)}}
        onCofirm={()=>{submitFun()}}
      >
         <Title name='任务列表' addtodo={addFun}  onCancle={()=>{setVisiable(false)}}></Title>
      </Modal>
    </div>
  )
}

export default PageA;

