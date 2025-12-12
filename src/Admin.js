// import { Layout,Menu} from 'antd';
// import React from 'react';
// import {UserOutlined, FileTextOutlined} from '@ant-design/icons';
// import SearchUser from './components/SearchUser';
// import UserTable from './components/UserTable';
// import SearchQuestions from './components/SearchQuestions';
// import QuestionTable from './components/QuestionTable';

// const { Header, Footer, Sider, Content } = Layout;
// const Admin = () => {
//   const [selectedKey, setSelectedKey] = React.useState('1');
  
//   return(
//   <>
//     <Layout>
//       <Header><h1 style={{ color: 'white' }}>Quiz管理系统</h1></Header>
//       <Layout>
//         <Sider>
//           <Menu
//             theme="dark"
//             mode="inline"
//             defaultSelectedKeys={['1']}
//             onClick={({ key }) => setSelectedKey(key)}
//             items={[
//               { key: '1', icon: <UserOutlined />, label: '用户管理' },
//               { key: '2', icon: <FileTextOutlined />, label: '题目管理' }
//             ]}
//           />
//         </Sider>

//         <Content>
//           {selectedKey === '1' && (
//             <>
//               <SearchUser />
//               <UserTable />
//             </>
//           )}
//           {selectedKey === '2' && (
//             <>
//             <SearchQuestions />
//             <QuestionTable />
//             </>   
//           )}
//         </Content>

//       </Layout>
//       <Footer style={{
//         textAlign: 'center',
//       }}
//       >Quiz管理系统 ©2025 Created by Swingdy</Footer>
//     </Layout>
//   </>
// );
// }
// export default Admin;

import { Layout, Menu } from 'antd';
import React from 'react';
import { UserOutlined, FileTextOutlined } from '@ant-design/icons';
import SearchUser from './components/SearchUser';
import UserTable from './components/UserTable';
import SearchQuestions from './components/SearchQuestions';
import QuestionTable from './components/QuestionTable';

const { Header, Footer, Sider, Content } = Layout;

const Admin = () => {
    const [selectedKey, setSelectedKey] = React.useState('1');
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ color: 'white', margin: 0 }}>Quiz管理系统</h1>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        selectedKeys={[selectedKey]}
                        onClick={({ key }) => setSelectedKey(key)}
                        style={{ height: '100%', borderRight: 0 }}
                        items={[
                            { key: '1', icon: <UserOutlined />, label: '用户管理' },
                            { key: '2', icon: <FileTextOutlined />, label: '题目管理' }
                        ]}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ 
                        padding: 24, 
                        margin: 0, 
                        minHeight: 280,
                        background: '#fff'
                    }}>
                        {selectedKey === '1' && (
                            <>
                                <SearchUser />
                                <UserTable />
                            </>
                        )}
                        {selectedKey === '2' && (
                            <>
                                <SearchQuestions />
                                <QuestionTable />
                            </>
                        )}
                    </Content>
                </Layout>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
                Quiz管理系统 ©2025 Created by Swingdy
            </Footer>
        </Layout>
    );
};

export default Admin;