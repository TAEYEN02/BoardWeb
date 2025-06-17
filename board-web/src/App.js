import { Router, BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './pages/signup';
import Login from './pages/login';
import Forgot from './pages/forgot';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/' element={<Login/>}/>
            <Route path='/forgot' element={<Forgot/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
