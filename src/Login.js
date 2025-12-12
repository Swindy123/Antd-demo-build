import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleFinish = async (values) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post('http://localhost:8080/login', values);
  //     const result = response.data;

  //     console.log('Login response:', result);

  //     if (result.code === '1') {
  //       localStorage.setItem('token', result.data);
  //       message.success('登录成功');
  //       onLogin();
  //       navigate('/Admin', { replace: true });
  //     } else {
  //       message.error('登录失败');
  //     }
  //   } catch (error) {
  //     message.error('网络错误');
  //   }
  //   setLoading(false);
  // };

  const handleFinish = async (values) => {
  setLoading(true);
  try {
    console.log('发送登录请求:', values);
    
    const response = await axios.post('http://localhost:8080/login', values, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const result = response.data;
    console.log('登录响应:', result);

    if (result.code === '1' || result.code === 1) { // 可能是数字或字符串
      localStorage.setItem('token', result.data || result.token);
      
      message.success('登录成功');
      onLogin();
      navigate('/Admin', { replace: true });
    } else {
      message.error(result.message || '登录失败');
    }
  } catch (error) {
    console.error('登录错误详情:', error);
    if (error.response) {
      // 服务器有响应但状态码不是2xx
      console.log('响应状态:', error.response.status);
      console.log('响应数据:', error.response.data);
      message.error(`服务器错误: ${error.response.status} - ${error.response.data?.message || '未知错误'}`);
    } else if (error.request) {
      // 请求已发送但没有收到响应
      console.log('没有收到响应');
      message.error('网络错误：无法连接到服务器');
    } else {
      // 请求配置出错
      console.log('请求配置错误:', error.message);
      message.error('请求配置错误');
    }
  }
  setLoading(false);
};

  return (
    <div style={{ maxWidth: 300, margin: '100px auto' }}>
      <h1 style={{ color: 'black' }}>Quiz管理系统登录</h1>
      <Form onFinish={handleFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;