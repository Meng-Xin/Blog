import React from 'react'
import { Form, Input, Button, Checkbox,Card ,Space,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import {setToken} from '../Utils/auth'
import {loginApi} from '../services/auth'
import {setToken} from '../Utils/auth'
import {withRouter} from 'react-router-dom'
import '../Component/login.css'


function LoginBar(props) {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        loginApi({
            username : values.username,
            password : values.password,
        })
            .then(res=>{
                // console.log(res)
                if(res.msg === '成功'){
                message.success("登陆成功")
                setToken(res.data.token);
                props.history.push('/admin');
                }
                if(res.msg === '失败'){
                    message.error(res.data)
                }
            })
            .catch(err =>{
                message.error("登陆请求异常~~~")
            })
      };
    return (
        <Card title="博客管理后台" className="login-form" >
            <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            >
            <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名！' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码！' }]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                 <Space size='large'>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                
                        <a className="login-form-forgot" href="###">
                        忘记密码
                        </a>
                </Space>
            </Form.Item>
        
            <Form.Item>
                <Space size='large'>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
                </Button>
                Or <a href="###">前去 注册!</a>
                </Space>
            </Form.Item>
            </Form>
        </Card>

      );
}
export default withRouter(LoginBar); 