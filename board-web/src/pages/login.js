import { Button } from "@mui/material";
import "../css/login.css";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("로그인이 되었습니다");
        navigate('/main');
    }
    return (
        <div className="Login">
            <div className="Login-Box">
                <h2 className="title">Log in</h2>
                <form className="Login-Form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <AccountCircle className="icon" />
                        <input type="text" placeholder="Your ID" />
                    </div>
                    <div className="input-wrapper">
                        <LockIcon className="icon" />
                        <input type="password" placeholder="Your Password" />
                    </div>
                    <Button type="submit" variant="contained" className="login-button" onSubmit={handleSubmit}>
                        Submit</Button>
                </form>
                <p className="forgot"><Link to="/forgot">아이디 / 비밀번호 찾기</Link></p>
                <p className="newMember"><Link to="/signup">회원가입</Link></p>
            </div>
        </div>
    );
};

export default Login;
