import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import SignUp from './pages/signup';
import Login from './pages/login';
import Forgot from './pages/forgot';
import Main from './pages/main';
import NavBar from './component/Navbar';
import BoardList from './pages/board';
import Write from './pages/write';
import MyPage from './pages/MyPage';
import PostDetail from './pages/PostDetail';
import PrivateRoute from './component/PrivateRoute';

const AppRoutes = () => {
  const location = useLocation();
  const hideNavPaths = ['/', '/signup', '/forgot'];
  const shouldHideNav = hideNavPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <NavBar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/main' element={<PrivateRoute><Main /></PrivateRoute>} />
        <Route path='/board' element={<PrivateRoute><BoardList/></PrivateRoute>}/>
        <Route path='/write' element={<PrivateRoute><Write/></PrivateRoute>}/>
        <Route path='/mypage' element={<PrivateRoute><MyPage /></PrivateRoute>} />
        <Route path='/post/:id' element={<PrivateRoute><PostDetail /></PrivateRoute>} />
        {/* Add other routes here */}

        <Route path='*'element={<Navigate to="/" replace />}/>
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
