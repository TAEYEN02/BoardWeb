import { Link } from "react-router-dom";
import "../css/forgot.css";
import { findUserId, resetPassword } from "../api/user";
import { useState } from "react";

const Forgot = () => {
    const [findEmail, setFindEmail] = useState("");
    const [resetId, setResetId] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const isValidPassword = (password) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return regex.test(password);
    };

    const handleFindId = async (e) => {
        e.preventDefault();
        try {
            const userId = await findUserId(findEmail);
            alert(`당신의 아이디는: ${userId}`);
        } catch (err) {
            console.error(err);
            alert("해당 이메일로 등록된 아이디가 없습니다.");
        }
    };

    const handleFindPassword = async (e) => {
        e.preventDefault();

        if (!isValidPassword(newPassword)) {
            alert("비밀번호는 8자 이상이며, 영문/숫자/특수문자를 포함해야 합니다.");
            return;
        }


        try {
            await resetPassword(resetId, resetEmail, newPassword);
            alert("비밀번호가 성공적으로 재설정되었습니다.");
        } catch (err) {
            console.error(err);
            alert("계정 정보를 확인해주세요.");
        }
    };
    return (
        <div className="Forgot">
            <div className="Forgot-Box">
                <h2>아이디 / 비밀번호 찾기</h2>
                <form className="Forgot-Form" onSubmit={handleFindId}>
                    <p className="section-title">아이디 찾기</p>
                    <input
                        type="email"
                        placeholder="가입한 이메일 입력"
                        required
                        value={findEmail}
                        onChange={(e) => setFindEmail(e.target.value)}
                    />
                    <button type="submit" className="forgot-button">아이디 찾기</button>
                </form>

                <form className="Forgot-Form" onSubmit={handleFindPassword}>
                    <p className="section-title">비밀번호 찾기</p>
                    <input
                        type="text"
                        placeholder="아이디 입력"
                        required
                        value={resetId}
                        onChange={(e) => setResetId(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="가입한 이메일 입력"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="새 비밀번호 입력"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {!isValidPassword(newPassword) && newPassword.length > 0 && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                            비밀번호는 8자 이상이며, 영문/숫자/특수문자를 포함해야 합니다.
                        </p>
                    )}
                    <button type="submit" className="forgot-button">비밀번호 재설정</button>
                </form>
                <p className="login"><Link to="/">로그인 화면으로 돌아가기기</Link></p>
            </div>
        </div>
    );
};

export default Forgot;
