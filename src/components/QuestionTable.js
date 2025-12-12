// // //QuestionTable.js的源代码：
// // import { render } from '@testing-library/react';
// // import { Space, Table } from 'antd';
// // import React from 'react';
// // const columns = [
// //     {
// //         title: '序号',
// //         dataIndex: 'id',
// //         key: 'id',
// //     },
// //     {
// //         title: '题目',
// //         dataIndex: 'question',
// //         key: 'question',
// //         render: (text) => <a>{text}</a>,
// //     },
// //     {
// //         title: '选项',
// //         dataIndex: 'options',
// //         key: 'options',
// //         render: (options) => options.join(', ')
// //     },
// //     {
// //         title: '答案',
// //         dataIndex: 'answer',
// //         key: 'answer',
// //     },
// //     {
// //         title: '操作',
// //         key: 'action',
// //         render: (_, record) => (
// //             <Space size="middle">
// //                 <a>编辑</a>
// //                 <a>删除</a>
// //             </Space>
// //         ),
// //     },
// // ];
// // const data = [
// //     {
// //         key: '1',
// //         id: '1',
// //         question: '什么是React？',
// //         options: ['A. 一个库', 'B. 一个框架', 'C. 一个语言'],
// //         answer: 'A'
// //     },
// //     {
// //         key: '2',
// //         id: '2',
// //         question: 'React的生命周期函数有哪些？',
// //         options: ['A. componentDidMount', ' B. componentDidUpdate', ' C. componentWillUnmount'],
// //         answer: 'A'
// //     },
// //     {
// //         key: '3',
// //         id: '3',
// //         question: 'React的状态管理有哪些方式？',
// //         options: ['A. Redux', ' B. MobX', ' C. Context API'],
// //         answer: 'A'
// //     },
// //     {
// //         key: '4',
// //         id: '4',
// //         question: 'React的性能优化手段有哪些？',
// //         options: ['A. 代码分割', ' B. 懒加载', 'C. 服务器端渲染'],
// //         answer: 'A'
// //     },
// //     {
// //         key: '5',
// //         id: '5',
// //         question: 'React的路由管理有哪些方式？',
// //         options: ['A. React Router', 'B. Next.js', 'C. Reach Router'],
// //         answer: 'A'
// //     }
// // ];

// // const onChange = (pagination, filters, sorter, extra) => {
// //     console.log('params', pagination, filters, sorter, extra);
// // };

// // const App = () => <Table
// //     columns={columns}
// //     dataSource={data}
// //     pagination={{
// //         current: 1, // 当前页码
// //         pageSize: 5, // 每页条数
// //         total: 100, // 数据总数
// //         showSizeChanger: false,
// //         position: ['bottomLeft'],
// //         onChange: () => { /* 页码或每页条数变化时的回调 */ },
// //     }}
// //     onChange={onChange} />;
// // export default App;

// import { Space, Table, message, Modal, Form, Input, Select } from 'antd';
// import React from 'react';
// import axios from 'axios';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { useState, useEffect } from 'react';

// const { TextArea } = Input;

// const QuestionTable = () => {
//     const [data, setData] = useState([]);
//     const [pagination, setPagination] = useState({
//         current: 1,
//         pageSize: 5,
//         total: 0,
//         showSizeChanger: false,
//         position: ['bottomLeft'],
//     });
//     const [loading, setLoading] = useState(false);
//     const [editVisible, setEditVisible] = useState(false);
//     const [editingQuestion, setEditingQuestion] = useState(null);
//     const [editForm] = Form.useForm();

//     // 获取题目数据
//     const fetchData = (page = 1, pageSize = 5, keyword = '') => {
//         setLoading(true);
//         let url = `http://localhost:8080/questions?page=${page}&pageSize=${pageSize}`;
        
//         // 如果有搜索关键词，使用搜索接口
//         if (keyword && keyword.trim() !== '') {
//             url = `http://localhost:8080/findQuestionPage?keyword=${encodeURIComponent(keyword)}&page=${page}&pageSize=${pageSize}`;
//         }
        
//         axios.get(url)
//             .then((response) => {
//                 const res = response.data;
//                 console.log('题目数据响应:', res);
                
//                 // 根据 Vue 代码的数据结构处理
//                 const questions = res?.data?.qsBeanList || [];
//                 const rows = questions.map((item) => ({
//                     key: item.id,
//                     id: item.id,
//                     questionText: item.questionText,
//                     options: `${item.answer1Text || ''}, ${item.answer2Text || ''}, ${item.answer3Text || ''}, ${item.answer4Text || ''}`,
//                     answer: item.answer1Correct ? 'A' : 
//                            item.answer2Correct ? 'B' : 
//                            item.answer3Correct ? 'C' : 
//                            item.answer4Correct ? 'D' : '',
//                     answer1Text: item.answer1Text,
//                     answer2Text: item.answer2Text,
//                     answer3Text: item.answer3Text,
//                     answer4Text: item.answer4Text,
//                     answer1Correct: item.answer1Correct,
//                     answer2Correct: item.answer2Correct,
//                     answer3Correct: item.answer3Correct,
//                     answer4Correct: item.answer4Correct,
//                 }));

//                 setData(rows);
//                 setPagination((prev) => ({
//                     ...prev,
//                     current: page,
//                     pageSize: pageSize,
//                     total: res?.data?.total || 0,
//                 }));
//             })
//             .catch((error) => {
//                 console.error("Error fetching questions:", error);
//                 message.error('获取题目数据失败');
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     // 搜索处理函数
//     const handleSearch = (keyword) => {
//         fetchData(1, pagination.pageSize, keyword);
//     };

//     // 删除题目
//     const handleDelete = (id) => {
//         if (!id) return;
//         setLoading(true);
//         axios.get(`http://localhost:8080/delQuestion?id=${id}`)
//             .then((res) => {
//                 const r = res.data;
//                 const ok = r && (r.code === 200 || r.code === 1 || r.success === true || r.status === 200);
//                 if (ok) {
//                     message.success(r.msg || r.message || '删除成功');
//                     fetchData(pagination.current, pagination.pageSize);
//                 } else {
//                     message.error(r?.msg || r?.message || '删除失败');
//                 }
//             })
//             .catch((err) => {
//                 console.error('Delete error', err);
//                 message.error('删除请求失败');
//             })
//             .finally(() => setLoading(false));
//     };

//     const confirmDelete = (id, questionText) => {
//         Modal.confirm({
//             title: `确认删除题目 "${questionText.substring(0, 20)}${questionText.length > 20 ? '...' : ''}" 吗？`,
//             icon: <ExclamationCircleOutlined />,
//             okText: '确认',
//             cancelText: '取消',
//             onOk() {
//                 return handleDelete(id);
//             }
//         });
//     };

//     // 编辑题目：打开模态并请求详情
//     const showEditModal = (id) => {
//         if (!id) return;
//         setLoading(true);
//         axios.get(`http://localhost:8080/getQuestionById?id=${id}`)
//             .then((res) => {
//                 const r = res.data;
//                 const question = (r && r.data) ? r.data : null;
//                 if (question) {
//                     setEditingQuestion(question);
                    
//                     // 获取正确答案
//                     const correctAnswer = question.answer1Correct ? 'a' :
//                                         question.answer2Correct ? 'b' :
//                                         question.answer3Correct ? 'c' :
//                                         question.answer4Correct ? 'd' : '';
                    
//                     editForm.setFieldsValue({
//                         id: question.id,
//                         question: question.questionText,
//                         optiona: question.answer1Text,
//                         optionb: question.answer2Text,
//                         optionc: question.answer3Text,
//                         optiond: question.answer4Text,
//                         answer: correctAnswer,
//                     });
//                     setEditVisible(true);
//                 } else {
//                     message.error('未找到题目信息');
//                 }
//             })
//             .catch((err) => {
//                 console.error('getQuestionById error', err);
//                 message.error('获取题目详情失败');
//             })
//             .finally(() => setLoading(false));
//     };

//     const handleEditOk = async () => {
//         try {
//             const values = await editForm.validateFields();
//             const payload = {
//                 id: values.id,
//                 question: values.question,
//                 optiona: values.optiona,
//                 optionb: values.optionb,
//                 optionc: values.optionc,
//                 optiond: values.optiond,
//                 answer: values.answer
//             };
//             setLoading(true);
//             axios.post('http://localhost:8080/updateQuestion', payload)
//                 .then((res) => {
//                     console.log('updateQuestion response:', res);
//                     const r = res.data;
//                     const ok = (r && (r.code === 200 || r.code === 1 || r.success === true || r.status === 200));
//                     if (ok) {
//                         message.success(r?.msg || r?.message || '更新成功');
//                         setEditVisible(false);
//                         fetchData(pagination.current, pagination.pageSize);
//                     } else {
//                         message.error(r?.msg || r?.message || JSON.stringify(r) || '更新失败');
//                     }
//                 })
//                 .catch((err) => {
//                     console.error('updateQuestion error', err);
//                     const serverMsg = err.response && err.response.data && (err.response.data.message || JSON.stringify(err.response.data));
//                     message.error(serverMsg || '更新请求失败');
//                 })
//                 .finally(() => setLoading(false));
//         } catch (err) {
//             console.log('表单验证失败:', err);
//         }
//     };

//     const handleEditCancel = () => {
//         setEditVisible(false);
//         editForm.resetFields();
//         setEditingQuestion(null);
//     };

//     // 表格列定义
//     const columns = [
//         {
//             title: '序号',
//             dataIndex: 'id',
//             key: 'id',
//             width: 80,
//         },
//         {
//             title: '题目',
//             dataIndex: 'questionText',
//             key: 'questionText',
//             width: 250,
//             render: (text) => (
//                 <div style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                     {text}
//                 </div>
//             ),
//         },
//         {
//             title: '选项',
//             dataIndex: 'options',
//             key: 'options',
//             width: 260,
//         },
//         {
//             title: '答案',
//             dataIndex: 'answer',
//             key: 'answer',
//             width: 100,
//         },
//         {
//             title: '操作',
//             key: 'action',
//             width: 150,
//             render: (_, record) => (
//                 <Space size="middle">
//                     <a onClick={() => showEditModal(record.id)}>编辑</a>
//                     <a onClick={() => confirmDelete(record.id, record.questionText)}>删除</a>
//                 </Space>
//             ),
//         },
//     ];

//     // 分页变化处理
//     const handleTableChange = (pag) => {
//         fetchData(pag.current, pag.pageSize);
//     };

//     // 初始化加载和事件监听
//     useEffect(() => {
//         fetchData(pagination.current, pagination.pageSize);

//         // 监听搜索事件
//         const onQuestionsSearch = (e) => {
//             const keyword = e?.detail?.keyword || '';
//             handleSearch(keyword);
//         };

//         // 监听题目变化事件（添加/编辑/删除后刷新）
//         const onQuestionsChanged = () => {
//             fetchData(pagination.current, pagination.pageSize);
//         };

//         window.addEventListener('questionsSearch', onQuestionsSearch);
//         window.addEventListener('questionsChanged', onQuestionsChanged);

//         return () => {
//             window.removeEventListener('questionsSearch', onQuestionsSearch);
//             window.removeEventListener('questionsChanged', onQuestionsChanged);
//         };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     return (
//         <>
//             <Table
//                 columns={columns}
//                 dataSource={data}
//                 pagination={pagination}
//                 loading={loading}
//                 onChange={handleTableChange}
//                 rowKey="id"
//                 scroll={{ x: 800 }}
//             />

//             {/* 编辑题目模态框 */}
//             <Modal
//                 title="编辑题目"
//                 open={editVisible}
//                 onOk={handleEditOk}
//                 onCancel={handleEditCancel}
//                 okText="保存"
//                 width={600}
//                 confirmLoading={loading}
//             >
//                 <Form form={editForm} layout="vertical">
//                     <Form.Item name="id" label="ID" hidden>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item 
//                         name="question" 
//                         label="题目" 
//                         rules={[{ required: true, message: '请输入题目' }]}
//                     >
//                         <TextArea rows={3} placeholder="请输入题目内容" />
//                     </Form.Item>
//                     <Form.Item 
//                         name="optiona" 
//                         label="选项 A" 
//                         rules={[{ required: true, message: '请输入选项 A' }]}
//                     >
//                         <Input placeholder="请输入选项A内容" />
//                     </Form.Item>
//                     <Form.Item 
//                         name="optionb" 
//                         label="选项 B" 
//                         rules={[{ required: true, message: '请输入选项 B' }]}
//                     >
//                         <Input placeholder="请输入选项B内容" />
//                     </Form.Item>
//                     <Form.Item 
//                         name="optionc" 
//                         label="选项 C" 
//                         rules={[{ required: true, message: '请输入选项 C' }]}
//                     >
//                         <Input placeholder="请输入选项C内容" />
//                     </Form.Item>
//                     <Form.Item 
//                         name="optiond" 
//                         label="选项 D" 
//                         rules={[{ required: true, message: '请输入选项 D' }]}
//                     >
//                         <Input placeholder="请输入选项D内容" />
//                     </Form.Item>
//                     <Form.Item 
//                         name="answer" 
//                         label="正确答案" 
//                         rules={[{ required: true, message: '请选择正确答案' }]}
//                     >
//                         <Select placeholder="请选择正确答案">
//                             <Select.Option value="a">A</Select.Option>
//                             <Select.Option value="b">B</Select.Option>
//                             <Select.Option value="c">C</Select.Option>
//                             <Select.Option value="d">D</Select.Option>
//                         </Select>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </>
//     );
// };

// export default QuestionTable;

import { Space, Table, message, Modal, Form, Input, Select } from 'antd';
import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { TextArea } = Input;

// 静态题目数据
const staticQuestions = [
  {
    id: 1,
    questionText: '什么是React？',
    answer1Text: '一个JavaScript库',
    answer2Text: '一个后端框架',
    answer3Text: '一个数据库',
    answer4Text: '一个编程语言',
    answer1Correct: true,
    answer2Correct: false,
    answer3Correct: false,
    answer4Correct: false,
  },
  {
    id: 2,
    questionText: 'React的主要特点是什么？',
    answer1Text: '组件化',
    answer2Text: '虚拟DOM',
    answer3Text: '单向数据流',
    answer4Text: '以上都是',
    answer1Correct: false,
    answer2Correct: false,
    answer3Correct: false,
    answer4Correct: true,
  },
  {
    id: 3,
    questionText: '下列哪个是React的生命周期方法？',
    answer1Text: 'componentDidMount',
    answer2Text: 'componentWillUnmount',
    answer3Text: 'render',
    answer4Text: '以上都是',
    answer1Correct: false,
    answer2Correct: false,
    answer3Correct: false,
    answer4Correct: true,
  },
  {
    id: 4,
    questionText: 'React中如何创建组件？',
    answer1Text: '使用class',
    answer2Text: '使用function',
    answer3Text: '使用箭头函数',
    answer4Text: '以上都可以',
    answer1Correct: false,
    answer2Correct: false,
    answer3Correct: false,
    answer4Correct: true,
  },
  {
    id: 5,
    questionText: 'React Hooks是什么时候引入的？',
    answer1Text: 'React 16.8',
    answer2Text: 'React 15.0',
    answer3Text: 'React 17.0',
    answer4Text: 'React 18.0',
    answer1Correct: true,
    answer2Correct: false,
    answer3Correct: false,
    answer4Correct: false,
  },
  {
    id: 6,
    questionText: 'JavaScript中的let和var有什么区别？',
    answer1Text: '作用域不同',
    answer2Text: 'let有块级作用域',
    answer3Text: 'var有变量提升',
    answer4Text: '以上都是',
    answer1Correct: false,
    answer2Correct: false,
    answer3Correct: false,
    answer4Correct: true,
  },
  {
    id: 7,
    questionText: '下列哪个不是JavaScript的数据类型？',
    answer1Text: 'String',
    answer2Text: 'Number',
    answer3Text: 'Boolean',
    answer4Text: 'Float',
    answer1Correct: false,
    answer2Correct: false,
    answer3Correct: false,
    answer4Correct: true,
  },
  {
    id: 8,
    questionText: 'CSS中position属性的值有哪些？',
    answer1Text: 'static',
    answer2Text: 'relative',
    answer3Text: 'absolute',
    answer4Text: '以上都是',
    answer1Correct: false,
    answer2Correct: false,
    answer3Correct: false,
    answer4Correct: true,
  },
  {
    id: 9,
    questionText: 'HTTP状态码200表示什么？',
    answer1Text: '请求成功',
    answer2Text: '未找到资源',
    answer3Text: '服务器错误',
    answer4Text: '重定向',
    answer1Correct: true,
    answer2Correct: false,
    answer3Correct: false,
    answer4Correct: false,
  },
  {
    id: 10,
    questionText: '下列哪个是数据库管理系统？',
    answer1Text: 'MySQL',
    answer2Text: 'MongoDB',
    answer3Text: 'PostgreSQL',
    answer4Text: '以上都是',
    answer1Correct: false,
    answer2Correct: false,
    answer3Correct: false,
    answer4Correct: true,
  }
];

// 添加、编辑、删除操作的静态数据管理
let questionsData = [...staticQuestions];

const QuestionTable = () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
        showSizeChanger: false,
        position: ['bottomLeft'],
    });
    const [loading, setLoading] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [editForm] = Form.useForm();

    // 获取题目数据
    const fetchData = (page = 1, pageSize = 5, keyword = '') => {
        setLoading(true);
        
        // 模拟网络请求延迟
        setTimeout(() => {
          try {
            let filteredData = [...questionsData];
            
            // 如果有搜索关键词，进行过滤
            if (keyword && keyword.trim() !== '') {
              filteredData = questionsData.filter(question => 
                question.questionText.toLowerCase().includes(keyword.toLowerCase()) ||
                question.answer1Text.toLowerCase().includes(keyword.toLowerCase()) ||
                question.answer2Text.toLowerCase().includes(keyword.toLowerCase()) ||
                question.answer3Text.toLowerCase().includes(keyword.toLowerCase()) ||
                question.answer4Text.toLowerCase().includes(keyword.toLowerCase())
              );
            }
            
            // 计算分页
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const pagedData = filteredData.slice(startIndex, endIndex);
            
            // 转换数据格式
            const rows = pagedData.map((item) => ({
                key: item.id,
                id: item.id,
                questionText: item.questionText,
                options: `${item.answer1Text || ''}, ${item.answer2Text || ''}, ${item.answer3Text || ''}, ${item.answer4Text || ''}`,
                answer: item.answer1Correct ? 'A' : 
                       item.answer2Correct ? 'B' : 
                       item.answer3Correct ? 'C' : 
                       item.answer4Correct ? 'D' : '',
                answer1Text: item.answer1Text,
                answer2Text: item.answer2Text,
                answer3Text: item.answer3Text,
                answer4Text: item.answer4Text,
                answer1Correct: item.answer1Correct,
                answer2Correct: item.answer2Correct,
                answer3Correct: item.answer3Correct,
                answer4Correct: item.answer4Correct,
            }));

            setData(rows);
            setPagination((prev) => ({
                ...prev,
                current: page,
                pageSize: pageSize,
                total: filteredData.length,
            }));
            
          } catch (error) {
            console.error("Error fetching questions:", error);
            message.error('获取题目数据失败');
          } finally {
            setLoading(false);
          }
        }, 300);
    };

    // 搜索处理函数
    const handleSearch = (keyword) => {
        fetchData(1, pagination.pageSize, keyword);
    };

    // 删除题目
    const handleDelete = (id) => {
        setLoading(true);
        
        // 模拟网络请求延迟
        setTimeout(() => {
          try {
            const index = questionsData.findIndex(q => q.id === id);
            if (index !== -1) {
              questionsData.splice(index, 1);
              message.success('删除题目成功');
              fetchData(pagination.current, pagination.pageSize);
            } else {
              message.error('题目不存在');
            }
          } catch (err) {
            console.error('Delete error', err);
            message.error('删除失败');
          } finally {
            setLoading(false);
          }
        }, 300);
    };

    const confirmDelete = (id, questionText) => {
        Modal.confirm({
            title: `确认删除题目 "${questionText.substring(0, 20)}${questionText.length > 20 ? '...' : ''}" 吗？`,
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                return handleDelete(id);
            }
        });
    };

    // 编辑题目：打开模态并获取详情
    const showEditModal = (id) => {
        setLoading(true);
        
        // 模拟网络请求延迟
        setTimeout(() => {
          try {
            const question = questionsData.find(q => q.id === id);
            if (question) {
                setEditingQuestion(question);
                
                // 获取正确答案
                const correctAnswer = question.answer1Correct ? 'a' :
                                    question.answer2Correct ? 'b' :
                                    question.answer3Correct ? 'c' :
                                    question.answer4Correct ? 'd' : '';
                
                editForm.setFieldsValue({
                    id: question.id,
                    question: question.questionText,
                    optiona: question.answer1Text,
                    optionb: question.answer2Text,
                    optionc: question.answer3Text,
                    optiond: question.answer4Text,
                    answer: correctAnswer,
                });
                setEditVisible(true);
            } else {
                message.error('未找到题目信息');
            }
          } catch (err) {
            console.error('获取题目详情错误', err);
            message.error('获取题目详情失败');
          } finally {
            setLoading(false);
          }
        }, 300);
    };

    const handleEditOk = async () => {
        try {
            const values = await editForm.validateFields();
            setLoading(true);
            
            // 模拟网络请求延迟
            setTimeout(() => {
              try {
                const index = questionsData.findIndex(q => q.id === values.id);
                if (index !== -1) {
                  // 更新题目数据
                  questionsData[index] = {
                    ...questionsData[index],
                    questionText: values.question,
                    answer1Text: values.optiona,
                    answer2Text: values.optionb,
                    answer3Text: values.optionc,
                    answer4Text: values.optiond,
                    answer1Correct: values.answer === 'a',
                    answer2Correct: values.answer === 'b',
                    answer3Correct: values.answer === 'c',
                    answer4Correct: values.answer === 'd',
                  };
                  
                  message.success('更新题目成功');
                  setEditVisible(false);
                  fetchData(pagination.current, pagination.pageSize);
                } else {
                  message.error('题目不存在');
                }
              } catch (err) {
                console.error('更新题目错误', err);
                message.error('更新题目失败');
              } finally {
                setLoading(false);
              }
            }, 300);
            
        } catch (err) {
            console.log('表单验证失败:', err);
        }
    };

    const handleEditCancel = () => {
        setEditVisible(false);
        editForm.resetFields();
        setEditingQuestion(null);
    };

    // 表格列定义
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: '题目',
            dataIndex: 'questionText',
            key: 'questionText',
            width: 250,
            render: (text) => (
                <div style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {text}
                </div>
            ),
        },
        {
            title: '选项',
            dataIndex: 'options',
            key: 'options',
            width: 260,
        },
        {
            title: '答案',
            dataIndex: 'answer',
            key: 'answer',
            width: 100,
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showEditModal(record.id)}>编辑</a>
                    <a onClick={() => confirmDelete(record.id, record.questionText)}>删除</a>
                </Space>
            ),
        },
    ];

    // 分页变化处理
    const handleTableChange = (pag) => {
        fetchData(pag.current, pag.pageSize);
    };

    // 初始化加载和事件监听
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);

        // 监听搜索事件
        const onQuestionsSearch = (e) => {
            const keyword = e?.detail?.keyword || '';
            handleSearch(keyword);
        };

        // 监听题目变化事件（添加/编辑/删除后刷新）
        const onQuestionsChanged = () => {
            fetchData(pagination.current, pagination.pageSize);
        };

        window.addEventListener('questionsSearch', onQuestionsSearch);
        window.addEventListener('questionsChanged', onQuestionsChanged);

        return () => {
            window.removeEventListener('questionsSearch', onQuestionsSearch);
            window.removeEventListener('questionsChanged', onQuestionsChanged);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                rowKey="id"
                scroll={{ x: 800 }}
            />

            {/* 编辑题目模态框 */}
            <Modal
                title="编辑题目"
                open={editVisible}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
                okText="保存"
                width={600}
                confirmLoading={loading}
            >
                <Form form={editForm} layout="vertical">
                    <Form.Item name="id" label="ID" hidden>
                        <Input />
                    </Form.Item>
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
        </>
    );
};

export default QuestionTable;