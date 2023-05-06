import React, {useState} from 'react'
const myContext = React.createContext() // 创建上下文
const {Provider, Consumer } = myContext

class Child extends React.Component{
    render(){
        // 第一种方法
        // console.log(this.context)
        // return (
        //     <div>
        //         <h2>子组件-{this.context}</h2>
        //     </div> 
        // )

        return (
            <Consumer>
                {
                    (ctx,c)=>{
                        return (
                            <div>子组件-{ctx}</div>
                        )
                    }
                }
            </Consumer>
        )
    }
}
//  Child.contextType = myContext

function Parent(props){
    return (
        <div>
            <h2>父组件</h2>
            <Child></Child>
        </div> 
    )
}

function Demo12(){
    return (
        <Provider value={100}>
            <div>
                <h2>上下文</h2>
                <Parent></Parent>
            </div>
        </Provider>
        
    )     
}

export default Demo12