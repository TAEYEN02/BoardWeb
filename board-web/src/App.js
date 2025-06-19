import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './pages/signup';
import Login from './pages/login';
import Forgot from './pages/forgot';
import Main from './pages/main';
import NavBar from './component/Navbar';

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
        <Route path='/main' element={<Main />} />
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
