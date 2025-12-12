// import React, { useState } from 'react';
// import { Modal, Button, Form, Input, Select, message } from 'antd';
// import axios from 'axios';

// const AddUser = () => {
//   const [visible, setVisible] = useState(false);
//   const [form] = Form.useForm();

//   const open = () => setVisible(true);
//   const close = () => {
//     setVisible(false);
//     form.resetFields();
//   };

//   const handleOk = async () => {
//     try {
//       const values = await form.validateFields();
//       const payload = {
//         username: values.username,
//         password: values.password,
//         checkpassword: values.checkpassword,
//         userrole: String(values.userrole),
//       };

//       axios.post('http://localhost:8080/addUser', payload)
//         .then((res) => {
//           message.success('用户添加成功');
//           // 通知其他组件刷新用户列表
//           window.dispatchEvent(new CustomEvent('usersChanged'));
//           close();
//         })
//         .catch((err) => {
//           console.error('Add user error:', err);
//           message.error('添加用户失败');
//         });
//     } catch (err) {
//       // 验证失败
//     }
//   };

//   return (
//     <>
//       <Button type="primary" onClick={open}>
//         添加用户
//       </Button>
//       <Modal
//         title="添加用户"
//         open={visible}
//         onOk={handleOk}
//         onCancel={close}
//         okText="保存"
//       >
//         <Form form={form} layout="vertical" initialValues={{ userrole: 0 }}>
//           <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
//             <Input.Password />
//           </Form.Item>
//           <Form.Item name="checkpassword" label="确认密码" rules={[{ required: true, message: '请确认密码' }]}>
//             <Input.Password />
//           </Form.Item>
//           <Form.Item name="userrole" label="角色" rules={[{ required: true }]}> 
//             <Select>
//               <Select.Option value={0}>普通用户</Select.Option>
//               <Select.Option value={1}>管理员</Select.Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default AddUser;

import { Form, Input, Select, Button, message } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';

const { Option } = Select;

const AddUser = ({ onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            console.log('添加用户:', values);
            
            const response = await axios.post('http://localhost:8080/addUser', {
                username: values.username,
                password: values.password,
                checkpassword: values.checkpassword,
                userrole: values.userrole
            });

            const result = response.data;
            console.log('添加用户响应:', result);

            if (result.code === 1 || result.code === '1') {
                message.success('添加用户成功');
                form.resetFields();
                
                // 触发自定义事件，通知 UserTable 刷新数据
                const event = new CustomEvent('usersChanged');
                window.dispatchEvent(event);
                
                // 关闭模态框
                if (onClose) onClose();
            } else {
                message.error(result.message || '添加用户失败');
            }
        } catch (error) {
            console.error('添加用户错误:', error);
            if (error.response) {
                message.error(`服务器错误: ${error.response.data?.message || '未知错误'}`);
            } else {
                message.error('网络错误');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            name="addUser"
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: '请输入用户名' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="checkpassword"
                label="确认密码"
                dependencies={['password']}
                rules={[
                    { required: true, message: '请确认密码' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次输入的密码不一致'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="userrole"
                label="用户角色"
                rules={[{ required: true, message: '请选择用户角色' }]}
            >
                <Select>
                    <Option value="0">普通用户</Option>
                    <Option value="1">管理员</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    添加
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddUser;