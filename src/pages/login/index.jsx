import './style.scss'
import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import {login} from '@/store/actions'

function Login(){
    const dispatch = useDispatch()

    // 登录提交
    const submit = (values) => {
      // console.log("values:", values);
    //   fetchLogin(values).then(res => {
    //     console.log("res:", res);
    //   })
        console.log(values)
         dispatch(login(values))
    }


    return (
        <div className='login'>
            <div className='layer'>
                <div className='wrap'>
                <h1 style={{ textAlign: "center" }}>欢迎使用</h1>
                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={submit}
                    autoComplete="off"
                    validateTrigger={['onBlur']}
                >
                    <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        { required: true, message: '用户名是必填字段' },
                    ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="密 码"
                    name="password"
                    rules={[
                        { required: true, message: '密码是必填字段' },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item
                    wrapperCol={{
                        offset: 5,
                        span: 16,
                    }}
                    >
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                    </Form.Item>
                </Form>
                </div>
            </div>
        </div>
    )
}

export default Login