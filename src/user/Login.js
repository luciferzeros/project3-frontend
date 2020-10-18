import React from 'react';
// import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Checkbox } from 'antd';
import getFactory from '../request';
import  Notification from '../general/Notification';
import  errorNotification from '../general/errorNotification';
import  { useHistory } from 'react-router-dom'


const Login = () => {
    const history = useHistory()

    const API = getFactory('user');
    async function getProfile(){
    try{
      const res = await API.getProfile();
      localStorage.setItem('user', JSON.stringify(res));
      Notification("Bạn đã đăng nhập thành công!");
      history.push("/");
    }
    catch(e){
        if(e.request.status === 0){
            errorNotification("Lỗi mạng!");
        }else if (e.request.status === 400){
            errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }else errorNotification(e.message);
    }
  }


  async function getToken(data) {
    try{
      const res = await API.signIn(data);
      localStorage.setItem('token', res.token);
      getProfile(); 
    }
      
    catch(e){
      // response.data.non_field_errors
        if(e.request.status === 0){
            errorNotification("Lỗi mạng!");
        }else if (e.request.status === 400){
            errorNotification("Sai tên tài khoản hoặc mật khẩu!");
        }else errorNotification(e.message);
    }
  }
    const onFinish = values => {
        getToken(values);

    };

    return(
        <div className="wrapper fadeInDown">
            <div id="formContent">
            <h2 className="active"> Đăng nhập </h2>
            <h2 className="inactive underlineHover"><a href='/register'>Đăng ký </a></h2>

            <div className="fadeIn first">
            {/* <img src="#" /> */}
            </div>
                <Form
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Nhập tên đăng nhập của bạn!' }]}
                    >
                        <Input className="fadeIn second"  placeholder="Username" maxLength="50" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                    >
                        <Input type='password' className="fadeIn second"  placeholder="Password" maxLength="100" />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Lưu đăng nhập</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <input type="submit" className="fadeIn fourth" value="Đăng nhập" />
                </Form>
                <div id="formFooter">
                    <a className="underlineHover" href="/forgot-password">Quên mật khẩu?</a>
                </div>
            </div>
        </div>
    )
}
export default Login;