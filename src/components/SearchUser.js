// // import { AudioOutlined } from '@ant-design/icons';
// // import { Input, Space, Button } from 'antd';
// // import React from 'react';
// // import { useState } from 'react';
// // import { Modal } from 'antd';
// // // import { useState } from 'react';
// // import AddUser from './AddUser';

// // const { Search } = Input;
// // const suffix = (
// //   <AudioOutlined
// //     style={{
// //       fontSize: 16,
// //       color: '#1890ff',
// //     }}
// //   />
// // );
// // const onSearch = (value) => console.log(value);

// // const App = () => {

// //   const [open, setOpen] = useState(false);

// //     const showModal = () => {
// //       setOpen(true);
// //     };
// //     const handleOk = () => {
// //       // setModalText('The modal will be closed after two seconds');
// //       setOpen(false);
// //     };
// //     const handleCancel = () => {
// //       console.log('Clicked cancel button');
// //       setOpen(false);
// //     };
// //   return (
// //     <Space direction="horizontal">
// //       <Search
// //         placeholder="请输入用户名"
// //         allowClear
// //         enterButton="查询用户"
// //         size="large"
// //         onSearch={onSearch}
// //       />
// //       <Button type="primary" onClick={showModal}>
// //             添加用户
// //           </Button>
// //           <Modal
// //             title="添加用户"
// //             open={open}
// //             onOk={handleOk}
// //             onCancel={handleCancel}
// //           >
// //             <AddUser />
// //           </Modal>
// //     </Space>
// //   );
// // }
// // export default App;

// import { Input, Space, Button, Modal } from 'antd';
// import React, { useState } from 'react';
// import AddUser from './AddUser';

// const SearchUser = () => {
//   const [open, setOpen] = useState(false);
//   const [searchKeyword, setSearchKeyword] = useState('');

//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   // 搜索功能
//   const handleSearch = () => {
//     console.log('搜索关键词:', searchKeyword);
    
//     // 触发自定义事件，通知 UserTable 组件进行搜索
//     const searchEvent = new CustomEvent('usersSearch', {
//       detail: { keyword: searchKeyword }
//     });
//     window.dispatchEvent(searchEvent);
//   };

//   // 处理输入框变化
//   const handleInputChange = (e) => {
//     setSearchKeyword(e.target.value);
//   };

//   // 处理回车键搜索
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   // 清空搜索（显示所有用户）
//   const handleClearSearch = () => {
//     setSearchKeyword('');
//     // 触发空关键词搜索，显示所有用户
//     const searchEvent = new CustomEvent('usersSearch', {
//       detail: { keyword: '' }
//     });
//     window.dispatchEvent(searchEvent);
//   };

//   return (
//     <Space direction="horizontal" style={{ marginBottom: 16, width: '100%' }}>
//       {/* 搜索输入框 */}
//       <Input
//         placeholder="请输入用户名"
//         value={searchKeyword}
//         onChange={handleInputChange}
//         onKeyPress={handleKeyPress}
//         style={{ width: 200 }}
//         allowClear
//         onClear={handleClearSearch}
//       />
      
//       {/* 查询按钮 */}
//       <Button type="primary" onClick={handleSearch}>
//         查询
//       </Button>
      
//       {/* 清空按钮 */}
//       <Button onClick={handleClearSearch}>
//         清空
//       </Button>
      
//       {/* 添加用户按钮 */}
//       <Button type="primary" onClick={showModal}>
//         添加用户
//       </Button>
      
//       {/* 添加用户模态框 */}
//       <Modal
//         title="添加用户"
//         open={open}
//         onCancel={handleCancel}
//         footer={null}
//         destroyOnClose
//         width={500}
//       >
//         <AddUser onClose={handleCancel} />
//       </Modal>
//     </Space>
//   );
// };

// export default SearchUser;

import { Input, Space, Button, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import AddUser from './AddUser';

const SearchUser = () => {
  const [open, setOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // 搜索功能
  const handleSearch = () => {
    console.log('搜索关键词:', searchKeyword);
    
    // 触发自定义事件，通知 UserTable 组件进行搜索
    const searchEvent = new CustomEvent('usersSearch', {
      detail: { keyword: searchKeyword }
    });
    window.dispatchEvent(searchEvent);
  };

  // 处理输入框变化
  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // 处理回车键搜索
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 清空搜索（显示所有用户）
  const handleClearSearch = () => {
    setSearchKeyword('');
    // 触发空关键词搜索，显示所有用户
    const searchEvent = new CustomEvent('usersSearch', {
      detail: { keyword: '' }
    });
    window.dispatchEvent(searchEvent);
  };

  return (
    <Space direction="horizontal" style={{ marginBottom: 16, width: '100%', alignItems: 'center' }}>
      {/* 添加"用户"文字 */}
      <Typography.Text style={{ marginRight: 8, fontWeight: 500 }}>
        用户
      </Typography.Text>
      
      {/* 搜索输入框 */}
      <Input
        placeholder="请输入用户名"
        value={searchKeyword}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{ width: 200 }}
        allowClear
        onClear={handleClearSearch}
      />
      
      {/* 查询按钮 */}
      <Button type="primary" onClick={handleSearch}>
        查询
      </Button>
      
      {/* 清空按钮 */}
      <Button onClick={handleClearSearch}>
        清空
      </Button>
      
      {/* 添加用户按钮 */}
      <Button type="primary" onClick={showModal}>
        添加用户
      </Button>
      
      {/* 添加用户模态框 */}
      <Modal
        title="添加用户"
        open={open}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={500}
      >
        <AddUser onClose={handleCancel} />
      </Modal>
    </Space>
  );
};

export default SearchUser;