import PropTypes from 'prop-types'
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

Modal.propTypes = {
  closeable: PropTypes.bool,
  children: PropTypes.node,
  visiable:PropTypes.bool,
  onCancel: PropTypes.func,
  onCofirm: PropTypes.func
}

Modal.defaultProps = {
  closeable: true,
  children:'什么都没有',
  visiable: false,
  onCancel: ()=>{},
  onCofirm: ()=>{}
}

Title.propTypes = {
  name: PropTypes.node,
  addtodo : PropTypes.func,
  onCancel: PropTypes.func,
}

Title.defaultProps = {
  name:'111',
  addtodo : ()=>{
    console.log(111)
  },
  onCancel: ()=>{}
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
      <button onClick={()=>{setVisiable(true)}}>添加todolist</button>
      <Modal
        closeable
        visiable={visiable}
        onCancle={()=>{setVisiable(false)}}
        onCofirm={()=>{submitFun()}}
      >
         <Title name='添加' addtodo={addFun}  onCancle={()=>{setVisiable(false)}}></Title>
      </Modal>
    </div>
  )
}

export default PageA;

