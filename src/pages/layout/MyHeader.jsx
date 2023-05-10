import {
    FontSizeOutlined,
  } from '@ant-design/icons';
import { Col, Row, Breadcrumb, Dropdown } from 'antd';
import {useNavigate} from 'react-router-dom'
import useBread from './useBread'
import {useDispatch} from 'react-redux'
import {switchSize} from '@/store/actions'
 

function MyHeader(props){
    const useBreadData = useBread()
    const navigate = useNavigate()
    const dispath = useDispatch()
    console.log(useBreadData)
    const renderBread = ()=>{
        let result = []
        useBreadData.forEach((item,index)=>{
            if(item.path && index !== useBreadData.length -1){
                result.push({
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

    const sizes = ['large', 'middle', 'small']
    let items = []
    function randerItem(){
        sizes.forEach((item,index) =>{
            items.push(
                {
                    label: <div onClick={()=>{toggleSize(item)}}>{item}</div>,
                    key: index + '',
                },   
            )  
        })
    }
    randerItem()

    const toggleSize = (size)=>{
        dispath(switchSize(size))
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
                <Dropdown
                    menu={{items}}
                    trigger={['click']}
                >
                    <FontSizeOutlined></FontSizeOutlined>
                </Dropdown>
                    
                </Col>
            </Row>   
        </div>
    )
}

export default MyHeader