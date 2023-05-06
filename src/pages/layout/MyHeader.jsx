import {
    FontSizeOutlined,
  } from '@ant-design/icons';
import { Col, Row, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom'
import useBread from './useBread'


function MyHeader(props){
    const useBreadData = useBread()
    const navigate = useNavigate()
    console.log(useBreadData)

    const renderBread = ()=>{
        let result = []
        useBreadData.forEach((item,index)=>{
            if(item.path && index !== useBreadData.length -1){
                result.push({
                    // title: <Link to={item.path}>{item.label}</Link>
                    title: <em onClick={()=>{linkTo(item)}}>{item.label}</em>
                }) 
            }else{
                result.push({
                    title: item.label
                })
            }
             
        })
        return result
    }

    const linkTo= (route)=>{
        navigate(route.path)
    }

    return (
        <div className='my-header'>
            <Row>
                <Col span={23}>
                <Breadcrumb
                    items={renderBread()}
                />
                </Col>
                <Col span={1}>
                    <FontSizeOutlined></FontSizeOutlined>
                </Col>
            </Row>   
        </div>
    )
}

export default MyHeader