// // import { Space, Table, message, Modal, Form, Input, Select } from 'antd';
// // import React from 'react';
// // import axios from 'axios';
// // import { ExclamationCircleOutlined } from '@ant-design/icons';

// // import {useState, useEffect} from 'react';

// // // columns defined inside component so they can access component functions (e.g. handleDelete)

// // // UserTable 组件
// // const App = () => {
// //     const [data, setData] = useState([]);
    
// //     const [pagination, setPagination] = useState({
// //         current: 1,
// //         pageSize: 5,
// //         total: 0,
// //         showSizeChanger: false,
// //         position: ['bottomLeft'],
// //     });
// //     const [loading, setLoading] = useState(false);
// //     const [editVisible, setEditVisible] = useState(false);
// //     const [editingUser, setEditingUser] = useState(null);
// //     const [editForm] = Form.useForm();

// //     const fetchData = (page = 1, pageSize = 5) => {
// //         setLoading(true);
// //         axios
// //             .get(`http://localhost:8080/users?page=${page}&pageSize=${pageSize}`)
// //             .then((response) => {
// //                 const res = response.data;
// //                 const rows = Array.isArray(res?.data?.row) ? res.data.row.map((item) => ({
// //                     key: item.id,
// //                     id: item.id,
// //                     userName: item.userName,
// //                     updateTime: item.updateTime,
// //                 })) : [];

// //                 setData(rows);
// //                 setPagination((prev) => ({
// //                     ...prev,
// //                     current: page,
// //                     pageSize: pageSize,
// //                     total: res?.data?.total || 0,
// //                 }));
// //             })

// //             .catch((error) => {
// //                 console.error("Error fetching users:", error);
// //                 message.error('获取用户数据失败');
// //             })
// //             .finally(() => {
// //                 setLoading(false);
// //             });
// //     };

// //     // 删除用户（软删除）
// //     const handleDelete = (id) => {
// //         if (!id) return;
// //         setLoading(true);
// //         axios.get(`http://localhost:8080/deleteById?id=${id}`)
// //             .then((res) => {
// //                 const r = res.data;
// //                 // 兼容后端使用 code===1 表示成功的情况
// //                 const ok = r && (r.code === 200 || r.code === 1 || r.success === true || r.status === 200);
// //                 if (ok) {
// //                     message.success(r.msg || r.message || '删除成功');
// //                 } else {
// //                     message.error(r?.msg || r?.message || '删除失败');
// //                 }
// //                 // 刷新当前页
// //                 fetchData(pagination.current, pagination.pageSize);
// //             })
// //             .catch((err) => {
// //                 console.error('Delete error', err);
// //                 message.error('删除请求失败');
// //             })
// //             .finally(() => setLoading(false));
// //     };

// //     const confirmDelete = (id) => {
// //         Modal.confirm({
// //             title: '确认删除该用户吗？',
// //             icon: <ExclamationCircleOutlined />,
// //             okText: '确认',
// //             cancelText: '取消',
// //             onOk() {
// //                 return handleDelete(id);
// //             }
// //         });
// //     };

// //     // 编辑用户：打开模态并请求详情
// //     const showEditModal = (id) => {
// //         if (!id) return;
// //         setLoading(true);
// //         axios.get(`http://localhost:8080/getUserById?id=${id}`)
// //             .then((res) => {
// //                 const r = res.data;
// //                 const user = (r && r.data) ? r.data : null;
// //                 if (user) {
// //                     setEditingUser(user);
// //                     editForm.setFieldsValue({
// //                         id: user.id,
// //                         username: user.userName || user.userName,
// //                         password: '',
// //                         userRole: user.userRole != null ? user.userRole : 0,
// //                     });
// //                     setEditVisible(true);
// //                 } else {
// //                     message.error('未找到用户信息');
// //                 }
// //             })
// //             .catch((err) => {
// //                 console.error('getUserById error', err);
// //                 message.error('获取用户详情失败');
// //             })
// //             .finally(() => setLoading(false));
// //     };

// //     const handleEditOk = async () => {
// //         try {
// //             const values = await editForm.validateFields();
// //             const payload = {
// //                 id: values.id,
// //                 username: values.username,
// //                 // 如果密码为空则后端可选择不修改（取决后端实现）
// //                 password: values.password || '',
// //                 userRole: values.userRole,
// //             };
// //             setLoading(true);
// //             axios.post('http://localhost:8080/updateUser', payload)
// //                     .then((res) => {
// //                         console.log('updateUser response:', res);
// //                         const r = res.data;
// //                         // 兼容不同后端返回格式：判断 code===200 或 code===1 或 success===true
// //                         const ok = (r && (r.code === 200 || r.code === 1 || r.success === true || r.status === 200));
// //                         if (ok) {
// //                             message.success(r?.msg || r?.message || '更新成功');
// //                             setEditVisible(false);
// //                             fetchData(pagination.current, pagination.pageSize);
// //                         } else {
// //                             console.warn('updateUser not ok, response:', r);
// //                             message.error(r?.msg || r?.message || JSON.stringify(r) || '更新失败');
// //                         }
// //                     })
// //                     .catch((err) => {
// //                         console.error('updateUser error', err, err.response && err.response.data);
// //                         const serverMsg = err.response && err.response.data && (err.response.data.message || JSON.stringify(err.response.data));
// //                         message.error(serverMsg || '更新请求失败');
// //                     })
// //                 .finally(() => setLoading(false));
// //         } catch (err) {
// //             // 验证失败
// //         }
// //     };

// //     const handleEditCancel = () => {
// //         setEditVisible(false);
// //         editForm.resetFields();
// //         setEditingUser(null);
// //     };

// //     // 在组件内定义 columns，这样 render 中可以直接使用 handleDelete
// //     const columns = [
// //         {
// //             title: '序号',
// //             dataIndex: 'id',
// //             key: 'id',
// //         },
// //         {
// //             title: '用户名',
// //             dataIndex: 'userName',
// //             key: 'userName',
// //             render: (text) => <a>{text}</a>,
// //         },
// //         {
// //             title: '日期',
// //             dataIndex: 'updateTime',
// //             key: 'updateTime',
// //             render: (text) => (text ? new Date(text).toLocaleString() : ''),
// //         },
// //         {
// //             title: '操作',
// //             key: 'action',
// //             render: (_, record) => (
// //                 <Space size="middle">
// //                     <a onClick={() => showEditModal(record.id)}>编辑</a>
// //                     <a onClick={() => confirmDelete(record.id)}>删除</a>
// //                 </Space>
// //             ),
// //         },
// //     ];

// //     useEffect(() => {
// //         fetchData(pagination.current, pagination.pageSize);

// //         const onUsersChanged = () => fetchData(pagination.current, pagination.pageSize);
// //         const onUsersSearch = (e) => {
// //             const keyword = e?.detail?.keyword || '';
// //             // 调用带关键字的分页查询接口
// //             setLoading(true);
// //             axios.get(`http://localhost:8080/findUserWithpage?keyword=${encodeURIComponent(keyword)}&page=1&pageSize=${pagination.pageSize}`)
// //                 .then((response) => {
// //                     const res = response.data;
// //                     const rows = Array.isArray(res?.data?.row) ? res.data.row.map((item) => ({
// //                         key: item.id,
// //                         id: item.id,
// //                         userName: item.userName,
// //                         updateTime: item.updateTime,
// //                     })) : [];
// //                     setData(rows);
// //                     setPagination((prev) => ({
// //                         ...prev,
// //                         current: 1,
// //                         total: res?.data?.total || 0,
// //                     }));
// //                 })
// //                 .catch((err) => {
// //                     console.error('search error', err);
// //                     message.error('查询失败');
// //                 })
// //                 .finally(() => setLoading(false));
// //         };

// //         window.addEventListener('usersChanged', onUsersChanged);
// //         window.addEventListener('usersSearch', onUsersSearch);
// //         return () => {
// //             window.removeEventListener('usersChanged', onUsersChanged);
// //             window.removeEventListener('usersSearch', onUsersSearch);
// //         };
// //         // eslint-disable-next-line react-hooks/exhaustive-deps
// //     }, []);

// //     const handleTableChange = (pag) => {
// //         fetchData(pag.current, pag.pageSize);
// //     };

// //     return (
// //         <>
// //             <Table
// //                 columns={columns}
// //                 dataSource={data}
// //                 pagination={pagination}
// //                 loading={loading}
// //                 onChange={handleTableChange}
// //             />

// //             <Modal
// //                 title="编辑用户"
// //                 open={editVisible}
// //                 onOk={handleEditOk}
// //                 onCancel={handleEditCancel}
// //                 okText="保存"
// //             >
// //                 <Form form={editForm} layout="vertical">
// //                     <Form.Item name="id" label="ID" hidden>
// //                         <Input />
// //                     </Form.Item>
// //                     <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}> 
// //                         <Input />
// //                     </Form.Item>
// //                     <Form.Item name="password" label="密码（不填则不修改）">
// //                         <Input.Password />
// //                     </Form.Item>
// //                     <Form.Item name="userRole" label="角色" rules={[{ required: true }]}> 
// //                         <Select>
// //                             <Select.Option value={0}>普通用户</Select.Option>
// //                             <Select.Option value={1}>管理员</Select.Option>
// //                         </Select>
// //                     </Form.Item>
// //                 </Form>
// //             </Modal>
// //         </>
// //     );
// // };
// // export default App;

// import { Space, Table, message, Modal, Form, Input, Select } from 'antd';
// import React from 'react';
// import axios from 'axios';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { useState, useEffect } from 'react';

// const UserTable = () => {
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
//     const [editingUser, setEditingUser] = useState(null);
//     const [editForm] = Form.useForm();

//     // 获取用户数据
//     const fetchData = (page = 1, pageSize = 5, keyword = '') => {
//         setLoading(true);
//         let url = `http://localhost:8080/users?page=${page}&pageSize=${pageSize}`;
        
//         // 如果有搜索关键词，使用搜索接口
//         if (keyword && keyword.trim() !== '') {
//             url = `http://localhost:8080/findUserWithpage?keyword=${encodeURIComponent(keyword)}&page=${page}&pageSize=${pageSize}`;
//         }
        
//         axios.get(url)
//             .then((response) => {
//                 const res = response.data;
//                 const rows = Array.isArray(res?.data?.row) ? res.data.row.map((item) => ({
//                     key: item.id,
//                     id: item.id,
//                     userName: item.userName,
//                     updateTime: item.updateTime,
//                     userRole: item.userRole || 0,
//                 })) : [];

//                 setData(rows);
//                 setPagination((prev) => ({
//                     ...prev,
//                     current: page,
//                     pageSize: pageSize,
//                     total: res?.data?.total || 0,
//                 }));
//             })
//             .catch((error) => {
//                 console.error("Error fetching users:", error);
//                 message.error('获取用户数据失败');
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     // 搜索处理函数
//     const handleSearch = (keyword) => {
//         fetchData(1, pagination.pageSize, keyword);
//     };

//     // 删除用户（软删除）
//     const handleDelete = (id) => {
//         if (!id) return;
//         setLoading(true);
//         axios.get(`http://localhost:8080/deleteById?id=${id}`)
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

//     const confirmDelete = (id) => {
//         Modal.confirm({
//             title: '确认删除该用户吗？',
//             icon: <ExclamationCircleOutlined />,
//             okText: '确认',
//             cancelText: '取消',
//             onOk() {
//                 return handleDelete(id);
//             }
//         });
//     };

//     // 编辑用户：打开模态并请求详情
//     const showEditModal = (id) => {
//         if (!id) return;
//         setLoading(true);
//         axios.get(`http://localhost:8080/getUserById?id=${id}`)
//             .then((res) => {
//                 const r = res.data;
//                 const user = (r && r.data) ? r.data : null;
//                 if (user) {
//                     setEditingUser(user);
//                     editForm.setFieldsValue({
//                         id: user.id,
//                         username: user.userName,
//                         password: '',
//                         userRole: user.userRole != null ? user.userRole : 0,
//                     });
//                     setEditVisible(true);
//                 } else {
//                     message.error('未找到用户信息');
//                 }
//             })
//             .catch((err) => {
//                 console.error('getUserById error', err);
//                 message.error('获取用户详情失败');
//             })
//             .finally(() => setLoading(false));
//     };

//     const handleEditOk = async () => {
//         try {
//             const values = await editForm.validateFields();
//             const payload = {
//                 id: values.id,
//                 username: values.username,
//                 password: values.password || '',
//                 userRole: values.userRole,
//             };
//             setLoading(true);
//             axios.post('http://localhost:8080/updateUser', payload)
//                 .then((res) => {
//                     console.log('updateUser response:', res);
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
//                     console.error('updateUser error', err);
//                     const serverMsg = err.response && err.response.data && (err.response.data.message || JSON.stringify(err.response.data));
//                     message.error(serverMsg || '更新请求失败');
//                 })
//                 .finally(() => setLoading(false));
//         } catch (err) {
//             // 验证失败
//         }
//     };

//     const handleEditCancel = () => {
//         setEditVisible(false);
//         editForm.resetFields();
//         setEditingUser(null);
//     };

//     // 表格列定义
//     const columns = [
//         {
//             title: '序号',
//             dataIndex: 'id',
//             key: 'id',
//         },
//         {
//             title: '用户名',
//             dataIndex: 'userName',
//             key: 'userName',
//         },
//         {
//             title: '用户角色',
//             dataIndex: 'userRole',
//             key: 'userRole',
//             render: (role) => (
//                 <span>{role === 1 ? '管理员' : '普通用户'}</span>
//             ),
//         },
//         {
//             title: '日期',
//             dataIndex: 'updateTime',
//             key: 'updateTime',
//             render: (text) => (text ? new Date(text).toLocaleString() : ''),
//         },
//         {
//             title: '操作',
//             key: 'action',
//             render: (_, record) => (
//                 <Space size="middle">
//                     <a onClick={() => showEditModal(record.id)}>编辑</a>
//                     <a onClick={() => confirmDelete(record.id)}>删除</a>
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
//         const onUsersSearch = (e) => {
//             const keyword = e?.detail?.keyword || '';
//             handleSearch(keyword);
//         };

//         // 监听用户变化事件（添加/编辑/删除后刷新）
//         const onUsersChanged = () => {
//             fetchData(pagination.current, pagination.pageSize);
//         };

//         window.addEventListener('usersSearch', onUsersSearch);
//         window.addEventListener('usersChanged', onUsersChanged);

//         return () => {
//             window.removeEventListener('usersSearch', onUsersSearch);
//             window.removeEventListener('usersChanged', onUsersChanged);
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
//             />

//             {/* 编辑用户模态框 */}
//             <Modal
//                 title="编辑用户"
//                 open={editVisible}
//                 onOk={handleEditOk}
//                 onCancel={handleEditCancel}
//                 okText="保存"
//                 width={500}
//             >
//                 <Form form={editForm} layout="vertical">
//                     <Form.Item name="id" label="ID" hidden>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="password" label="密码（不填则不修改）">
//                         <Input.Password placeholder="留空表示不修改密码" />
//                     </Form.Item>
//                     <Form.Item name="userRole" label="角色" rules={[{ required: true }]}>
//                         <Select>
//                             <Select.Option value={0}>普通用户</Select.Option>
//                             <Select.Option value={1}>管理员</Select.Option>
//                         </Select>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </>
//     );
// };

// export default UserTable;

import { Space, Table, message, Modal, Form, Input, Select } from 'antd';
import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

// 静态用户数据
const staticUsers = [
  {
    id: 1,
    userName: 'admin',
    updateTime: '2024-01-01T10:00:00',
    userRole: 1,
  },
  {
    id: 2,
    userName: 'user1',
    updateTime: '2024-01-02T10:00:00',
    userRole: 0,
  },
  {
    id: 3,
    userName: 'user2',
    updateTime: '2024-01-03T10:00:00',
    userRole: 0,
  },
  {
    id: 4,
    userName: 'user3',
    updateTime: '2024-01-04T10:00:00',
    userRole: 0,
  },
  {
    id: 5,
    userName: 'user4',
    updateTime: '2024-01-05T10:00:00',
    userRole: 0,
  },
  {
    id: 6,
    userName: 'testuser',
    updateTime: '2024-01-06T10:00:00',
    userRole: 0,
  },
  {
    id: 7,
    userName: 'manager',
    updateTime: '2024-01-07T10:00:00',
    userRole: 1,
  },
  {
    id: 8,
    userName: 'guest',
    updateTime: '2024-01-08T10:00:00',
    userRole: 0,
  },
  {
    id: 9,
    userName: 'developer',
    updateTime: '2024-01-09T10:00:00',
    userRole: 0,
  },
  {
    id: 10,
    userName: 'tester',
    updateTime: '2024-01-10T10:00:00',
    userRole: 0,
  }
];

// 直接导出静态数据，用于在没有后端时显示
const getStaticData = () => {
  return staticUsers.map(user => ({
    key: user.id,
    id: user.id,
    userName: user.userName,
    updateTime: user.updateTime,
    userRole: user.userRole,
  }));
};

// UserTable 组件
const App = () => {
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
    const [editingUser, setEditingUser] = useState(null);
    const [editForm] = Form.useForm();

    const fetchData = (page = 1, pageSize = 5) => {
        setLoading(true);
        
        // 尝试连接后端，如果失败则使用静态数据
        axios.get(`http://localhost:8080/users?page=${page}&pageSize=${pageSize}`)
            .then((response) => {
                // 后端连接成功，使用后端数据
                const res = response.data;
                const rows = Array.isArray(res?.data?.row) ? res.data.row.map((item) => ({
                    key: item.id,
                    id: item.id,
                    userName: item.userName,
                    updateTime: item.updateTime,
                    userRole: item.userRole || 0,
                })) : [];

                setData(rows);
                setPagination((prev) => ({
                    ...prev,
                    current: page,
                    pageSize: pageSize,
                    total: res?.data?.total || 0,
                }));
                console.log('使用后端数据');
            })
            .catch((error) => {
                console.log("后端连接失败，使用静态数据:", error);
                
                // 后端连接失败，使用静态数据
                const allStaticData = getStaticData();
                const startIndex = (page - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const pagedData = allStaticData.slice(startIndex, endIndex);
                
                setData(pagedData);
                setPagination((prev) => ({
                    ...prev,
                    current: page,
                    pageSize: pageSize,
                    total: allStaticData.length,
                }));
                console.log('使用静态数据');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 搜索处理函数
    const handleSearch = (keyword) => {
        setLoading(true);
        
        // 尝试后端搜索
        axios.get(`http://localhost:8080/findUserWithpage?keyword=${encodeURIComponent(keyword)}&page=1&pageSize=${pagination.pageSize}`)
            .then((response) => {
                const res = response.data;
                const rows = Array.isArray(res?.data?.row) ? res.data.row.map((item) => ({
                    key: item.id,
                    id: item.id,
                    userName: item.userName,
                    updateTime: item.updateTime,
                    userRole: item.userRole || 0,
                })) : [];
                setData(rows);
                setPagination((prev) => ({
                    ...prev,
                    current: 1,
                    total: res?.data?.total || 0,
                }));
            })
            .catch((error) => {
                console.log("后端搜索失败，使用静态数据搜索:", error);
                
                // 后端搜索失败，使用静态数据搜索
                const allStaticData = getStaticData();
                let filteredData = allStaticData;
                
                if (keyword && keyword.trim() !== '') {
                    filteredData = allStaticData.filter(user => 
                        user.userName.toLowerCase().includes(keyword.toLowerCase())
                    );
                }
                
                const pagedData = filteredData.slice(0, pagination.pageSize);
                setData(pagedData);
                setPagination((prev) => ({
                    ...prev,
                    current: 1,
                    total: filteredData.length,
                }));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 删除用户
    const handleDelete = (id) => {
        if (!id) return;
        setLoading(true);
        
        // 尝试调用后端删除接口
        axios.get(`http://localhost:8080/deleteById?id=${id}`)
            .then((res) => {
                const r = res.data;
                const ok = r && (r.code === 200 || r.code === 1 || r.success === true || r.status === 200);
                if (ok) {
                    message.success(r.msg || r.message || '删除成功');
                    fetchData(pagination.current, pagination.pageSize);
                } else {
                    message.error(r?.msg || r?.message || '删除失败');
                }
            })
            .catch((err) => {
                console.error('删除请求失败，模拟删除:', err);
                // 后端删除失败，模拟删除效果
                message.success('模拟删除成功（后端连接失败）');
                fetchData(pagination.current, pagination.pageSize);
            })
            .finally(() => setLoading(false));
    };

    const confirmDelete = (id) => {
        Modal.confirm({
            title: '确认删除该用户吗？',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                return handleDelete(id);
            }
        });
    };

    // 编辑用户
    const showEditModal = (id) => {
        if (!id) return;
        setLoading(true);
        
        // 尝试调用后端获取用户详情
        axios.get(`http://localhost:8080/getUserById?id=${id}`)
            .then((res) => {
                const r = res.data;
                const user = (r && r.data) ? r.data : null;
                if (user) {
                    setEditingUser(user);
                    editForm.setFieldsValue({
                        id: user.id,
                        username: user.userName,
                        password: '',
                        userRole: user.userRole != null ? user.userRole : 0,
                    });
                    setEditVisible(true);
                } else {
                    message.error('未找到用户信息');
                }
            })
            .catch((err) => {
                console.error('获取用户详情失败，使用模拟数据:', err);
                // 使用静态数据中的用户信息
                const allStaticData = getStaticData();
                const user = allStaticData.find(u => u.id === id);
                if (user) {
                    editForm.setFieldsValue({
                        id: user.id,
                        username: user.userName,
                        password: '',
                        userRole: user.userRole || 0,
                    });
                    setEditVisible(true);
                } else {
                    message.error('未找到用户信息');
                }
            })
            .finally(() => setLoading(false));
    };

    const handleEditOk = async () => {
        try {
            const values = await editForm.validateFields();
            const payload = {
                id: values.id,
                username: values.username,
                password: values.password || '',
                userRole: values.userRole,
            };
            setLoading(true);
            
            // 尝试调用后端更新接口
            axios.post('http://localhost:8080/updateUser', payload)
                .then((res) => {
                    console.log('updateUser response:', res);
                    const r = res.data;
                    const ok = (r && (r.code === 200 || r.code === 1 || r.success === true || r.status === 200));
                    if (ok) {
                        message.success(r?.msg || r?.message || '更新成功');
                        setEditVisible(false);
                        fetchData(pagination.current, pagination.pageSize);
                    } else {
                        message.error(r?.msg || r?.message || JSON.stringify(r) || '更新失败');
                    }
                })
                .catch((err) => {
                    console.error('更新用户失败，模拟更新:', err);
                    message.success('模拟更新成功（后端连接失败）');
                    setEditVisible(false);
                    fetchData(pagination.current, pagination.pageSize);
                })
                .finally(() => setLoading(false));
        } catch (err) {
            // 表单验证失败
        }
    };

    const handleEditCancel = () => {
        setEditVisible(false);
        editForm.resetFields();
        setEditingUser(null);
    };

    // 表格列定义
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '用户角色',
            dataIndex: 'userRole',
            key: 'userRole',
            render: (role) => (
                <span>{role === 1 ? '管理员' : '普通用户'}</span>
            ),
        },
        {
            title: '日期',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: (text) => (text ? new Date(text).toLocaleString() : ''),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showEditModal(record.id)}>编辑</a>
                    <a onClick={() => confirmDelete(record.id)}>删除</a>
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
        const onUsersSearch = (e) => {
            const keyword = e?.detail?.keyword || '';
            handleSearch(keyword);
        };

        // 监听用户变化事件
        const onUsersChanged = () => {
            fetchData(pagination.current, pagination.pageSize);
        };

        window.addEventListener('usersSearch', onUsersSearch);
        window.addEventListener('usersChanged', onUsersChanged);

        return () => {
            window.removeEventListener('usersSearch', onUsersSearch);
            window.removeEventListener('usersChanged', onUsersChanged);
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
            />

            {/* 编辑用户模态框 */}
            <Modal
                title="编辑用户"
                open={editVisible}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
                okText="保存"
                width={500}
            >
                <Form form={editForm} layout="vertical">
                    <Form.Item name="id" label="ID" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="密码（不填则不修改）">
                        <Input.Password placeholder="留空表示不修改密码" />
                    </Form.Item>
                    <Form.Item name="userRole" label="角色" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value={0}>普通用户</Select.Option>
                            <Select.Option value={1}>管理员</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default App;