import { Button } from "@mui/material";
import "../css/login.css";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../api/userApi";

const Login = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ userId, password });
            if (response && response.nickname) {
                localStorage.setItem('userNickname', response.nickname);
            }
            navigate('/main');
        } catch (error) {
            setError("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    };

    return (
        <div className="Login">
            <div className="Login-Box">
                <h2 className="title">Log in</h2>
                <form className="Login-Form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <AccountCircle className="icon" />
                        <input
                            type="text"
                            placeholder="Your ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <LockIcon className="icon" />
                        <input
                            type="password"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <Button type="submit" variant="contained" className="login-button">
                        Submit
                    </Button>
                </form>
                <p className="forgot"><Link to="/forgot">아이디 / 비밀번호 찾기</Link></p>
                <p className="newMember"><Link to="/signup">회원가입</Link></p>
            </div>
        </div>
    );
};

export default Login;
