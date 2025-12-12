// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './Login';
// import Admin from './Admin';

// const App = () => {
//   const [isLogin, setIsLogin] = useState(() => {
//     const token = localStorage.getItem('token');
//     return !!token; // 如果有 token 则认为是已登录
//   });
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/login"
//           element={<Login onLogin={() => setIsLogin(true)} />}
//         />
//         <Route
//           path="/Admin"
//           element={
//             isLogin ? <Admin /> : <Navigate to="/login" replace />
//           }
//         />
//         <Route
//           path="/"
//           element={<Navigate to="/login" replace />}
//         />
//       </Routes>
//     </Router>
//   );
// };
// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Admin from './Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
};
export default App;