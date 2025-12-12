// import React, { useState } from 'react';
// import { Modal, Button, Form, Input, Select, message } from 'antd';

// const { TextArea } = Input;

// const AddQuestion = ({ onAdd }) => {
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
//       const { question, optionA, optionB, optionC, optionD, answer } = values;
//       const newQuestion = {
//         question,
//         options: [optionA, optionB, optionC, optionD],
//         answer,
//       };
//       message.success('题目已添加（示例，仅前端）');
//       if (typeof onAdd === 'function') onAdd(newQuestion);
//       close();
//     } catch (err) {
//       // 验证失败，表单会显示错误
//     }
//   };

//   return (
//     <>
//       <Button type="primary" onClick={open}>
//         添加题目
//       </Button>
//       <Modal
//         title="添加题目"
//         open={visible}
//         onOk={handleOk}
//         onCancel={close}
//         okText="保存"
//       >
//         <Form form={form} layout="vertical" initialValues={{ answer: 'A' }}>
//           <Form.Item
//             name="question"
//             label="题目"
//             rules={[{ required: true, message: '请输入题目' }]}
//           >
//             <TextArea rows={3} />
//           </Form.Item>

//           <Form.Item
//             name="optionA"
//             label="选项 A"
//             rules={[{ required: true, message: '请输入选项 A' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="optionB"
//             label="选项 B"
//             rules={[{ required: true, message: '请输入选项 B' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="optionC"
//             label="选项 C"
//             rules={[{ required: true, message: '请输入选项 C' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="optionD"
//             label="选项 D"
//             rules={[{ required: true, message: '请输入选项 D' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item name="answer" label="正确答案" rules={[{ required: true }]}> 
//             <Select>
//               <Select.Option value="A">A</Select.Option>
//               <Select.Option value="B">B</Select.Option>
//               <Select.Option value="C">C</Select.Option>
//               <Select.Option value="D">D</Select.Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default AddQuestion;


import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const AddQuestion = ({ onClose }) => {
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const close = () => {
    setVisible(false);
    form.resetFields();
    if (onClose) onClose();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('添加题目数据:', values);
      
      setLoading(true);
      
      // 根据 Vue 代码的格式构建请求数据
      const questionData = {
        question: values.question,
        optiona: values.optiona,
        optionb: values.optionb,
        optionc: values.optionc,
        optiond: values.optiond,
        answer: values.answer
      };
      
      console.log('发送的题目数据:', questionData);
      
      axios.post('http://localhost:8080/addQuestion', questionData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('添加题目响应:', response.data);
        
        if (response.data && (response.data.code === 1 || response.data.code === '1')) {
          message.success('添加题目成功');
          form.resetFields();
          
          // 触发自定义事件，通知 QuestionTable 刷新数据
          const event = new CustomEvent('questionsChanged');
          window.dispatchEvent(event);
          
          close();
        } else {
          message.error(response.data?.msg || '添加题目失败');
        }
      })
      .catch((error) => {
        console.error('添加题目错误:', error);
        if (error.response) {
          message.error(`服务器错误: ${error.response.data?.message || '未知错误'}`);
        } else {
          message.error('网络错误');
        }
      })
      .finally(() => {
        setLoading(false);
      });
      
    } catch (err) {
      console.log('表单验证失败:', err);
    }
  };

  return (
    <Modal
      title="添加题目"
      open={visible}
      onOk={handleOk}
      onCancel={close}
      okText="保存"
      confirmLoading={loading}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="question"
          label="题目"
          rules={[{ required: true, message: '请输入题目' }]}
        >
          <TextArea rows={3} placeholder="请输入题目内容" />
        </Form.Item>

        <Form.Item
          name="optiona"
          label="选项 A"
          rules={[{ required: true, message: '请输入选项 A' }]}
        >
          <Input placeholder="请输入选项A内容" />
        </Form.Item>

        <Form.Item
          name="optionb"
          label="选项 B"
          rules={[{ required: true, message: '请输入选项 B' }]}
        >
          <Input placeholder="请输入选项B内容" />
        </Form.Item>

        <Form.Item
          name="optionc"
          label="选项 C"
          rules={[{ required: true, message: '请输入选项 C' }]}
        >
          <Input placeholder="请输入选项C内容" />
        </Form.Item>

        <Form.Item
          name="optiond"
          label="选项 D"
          rules={[{ required: true, message: '请输入选项 D' }]}
        >
          <Input placeholder="请输入选项D内容" />
        </Form.Item>

        <Form.Item 
          name="answer" 
          label="正确答案" 
          rules={[{ required: true, message: '请选择正确答案' }]}
        >
          <Select placeholder="请选择正确答案">
            <Select.Option value="a">A</Select.Option>
            <Select.Option value="b">B</Select.Option>
            <Select.Option value="c">C</Select.Option>
            <Select.Option value="d">D</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddQuestion;