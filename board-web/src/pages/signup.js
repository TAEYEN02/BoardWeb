import { Button } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import "../css/signup.css";
import ButtonComponent from "../component/Button";
import { useState } from "react";
import { checkNicknameDuplicate, checkUserIdDuplicate, signup,checkUserEmailDuplicate } from "../api/user";

const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const navigate = useNavigate();

    // 아이디: 영문+숫자 4~20자
    const isValidUserId = (userId) => /^[a-zA-Z0-9]{4,20}$/.test(userId);

    // 이메일 형식 체크 
    const isValidEmail = (email) =>
        /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(email);

    const isValidPassword = (password) => {
        // 조건: 8자 이상, 영문+숫자+특수��자 조합
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isValidUserId(userId)) {
            alert("아이디는 영문과 숫자를 포함해 4~20자여야 합니다.");
            return;
        }

        if (!isValidEmail(email)) {
            alert("유효한 이메일 형식이 아닙니다.");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!isValidPassword(password)) {
            alert("비밀번호는 8자 이상이며, 영문/숫자/특수문자를 포함해야 합니다.");
            return;
        }


        try {
            const signupData = {
                userName,
                userId,
                nickname,
                email,
                password
            };

            await signup(signupData);
            alert("회원가입이 완료되었습니다!");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };



    const distinctNickName = async (e) => {
        e.preventDefault();
        try {
            const isDuplicate = await checkNicknameDuplicate(nickname);
            if (isDuplicate) {
                alert("이미 사용 중인 닉네임입니다.");
            } else {
                alert("사용 가능한 닉네임입니다!");
            }
        } catch (err) {
            console.error(err);
            alert("중복 확인 중 오류가 발생했습니다.");
        }
    };

    const distinctUserId = async (e) => {
        e.preventDefault();
        try {
            const isDuplicate = await checkUserIdDuplicate(userId);
            if (isDuplicate) {
                alert("이미 사용 중인 아이디 입니다")
            } else {
                alert("사용 가능한 아이디입니다");
            }
        } catch (err) {
            console.log(err);
            alert("중복 확인 중에 오류가 발생했습니다");
        }
    }

     const distinctUserEmail = async (e) => {
        e.preventDefault();
        try {
            const isDuplicate = await checkUserEmailDuplicate(email);
            if (isDuplicate) {
                alert("이미 사용 중인 이메일 입니다")
            } else {
                alert("사용 가능한 이메일입니다");
            }
        } catch (err) {
            console.log(err);
            alert("중복 확인 중에 오류가 발생했습니다");
        }
    }


    return (
        <div className="Signup">
            <div className="Signup-Box">
                <h2 className="title">Sign Up</h2>
                <form className="Signup-Form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <AccountCircle className="icon" />
                        <input
                            type="text"
                            placeholder="ID"
                            required
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        /> {/*required : 필수 */}
                        <ButtonComponent title="distinct" onClick={distinctUserId} disabled={!isValidUserId(userId)}>중복확인</ButtonComponent>
                    </div>
                    <div className="input-wrapper">
                        <AccountCircle className="icon" />
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        /> {/*required : 필수 */}
                    </div>
                    <div className="input-wrapper">
                        <AccountCircle className="icon" />
                        <input
                            type="text"
                            placeholder="Your NickName"
                            required
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <ButtonComponent title="distinct" onClick={distinctNickName}>중복확인</ButtonComponent>
                    </div>
                    <div className="input-wrapper">
                        <EmailIcon className="icon" />
                        <input
                            type="email"
                            placeholder="Your Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                         <ButtonComponent title="distinct" onClick={distinctUserEmail}>중복확인</ButtonComponent>
                    </div>
                    <div className="input-wrapper">
                        <LockIcon className="icon" />
                        <input
                            type="password"
                            placeholder="Your Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!isValidPassword(password) && password.length > 0 && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                비밀번호는 8자 이상이며, 영문/숫자/특수문자를 포함해야 합니다.
                            </p>
                        )}
                    </div>
                    <div className="input-wrapper">
                        <LockIcon className="icon" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        style={{
                            padding: "12px", fontSize: "18px", backgroundColor: "#afaeeb"
                        }}
                    >

                        Submit
                    </Button>

                </form>
                <p className="login"><Link to="/">이미 회원이십니까? 로그인화면으로 가기</Link></p>
            </div>
        </div>
    );
};

export default SignUp;