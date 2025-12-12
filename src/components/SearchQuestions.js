// // import { AudioOutlined } from '@ant-design/icons';
// // import { Input, Space } from 'antd';
// // import React from 'react';
// // import AddQuestion from './AddQuestion';


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

// // const App = () => (
// //   <Space direction="horizontal">
// //     <Search
// //       placeholder="请输入题目关键字"
// //       allowClear
// //       enterButton="查询题目"
// //       size="large"
// //       onSearch={onSearch}
// //     />
// //     <AddQuestion />
// //   </Space>
// // );
// // export default App;

// import { Input, Space, Button, Modal } from 'antd';
// import React, { useState } from 'react';
// import AddQuestion from './AddQuestion';

// const SearchQuestions = () => {
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
    
//     // 触发自定义事件，通知 QuestionTable 组件进行搜索
//     const searchEvent = new CustomEvent('questionsSearch', {
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

//   // 清空搜索（显示所有题目）
//   const handleClearSearch = () => {
//     setSearchKeyword('');
//     // 触发空关键词搜索，显示所有题目
//     const searchEvent = new CustomEvent('questionsSearch', {
//       detail: { keyword: '' }
//     });
//     window.dispatchEvent(searchEvent);
//   };

//   return (
//     <Space direction="horizontal" style={{ marginBottom: 16, width: '100%' }}>
//       {/* 搜索输入框 */}
//       <Input
//         placeholder="请输入题目关键词"
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
      
//       {/* 添加题目按钮 */}
//       <Button type="primary" onClick={showModal}>
//         添加题目
//       </Button>
      
//       {/* 添加题目模态框 */}
//       <Modal
//         title="添加题目"
//         open={open}
//         onCancel={handleCancel}
//         footer={null}
//         destroyOnClose
//         width={600}
//       >
//         <AddQuestion onClose={handleCancel} />
//       </Modal>
//     </Space>
//   );
// };

// export default SearchQuestions;

import { Input, Space, Button, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import AddQuestion from './AddQuestion';

const SearchQuestions = () => {
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
    
    // 触发自定义事件，通知 QuestionTable 组件进行搜索
    const searchEvent = new CustomEvent('questionsSearch', {
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

  // 清空搜索（显示所有题目）
  const handleClearSearch = () => {
    setSearchKeyword('');
    // 触发空关键词搜索，显示所有题目
    const searchEvent = new CustomEvent('questionsSearch', {
      detail: { keyword: '' }
    });
    window.dispatchEvent(searchEvent);
  };

  return (
    <Space direction="horizontal" style={{ marginBottom: 16, width: '100%', alignItems: 'center' }}>
      {/* 添加"题目"文字 */}
      <Typography.Text style={{ marginRight: 8, fontWeight: 500 }}>
        题目
      </Typography.Text>
      
      {/* 搜索输入框 */}
      <Input
        placeholder="请输入题目关键词"
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
      
      {/* 添加题目按钮 */}
      <Button type="primary" onClick={showModal}>
        添加题目
      </Button>
      
      {/* 添加题目模态框 */}
      <Modal
        title="添加题目"
        open={open}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={600}
      >
        <AddQuestion onClose={handleCancel} />
      </Modal>
    </Space>
  );
};

export default SearchQuestions;