import { Link } from "react-router-dom";
import "../css/forgot.css";

const Forgot = () => {
    const handleFindId = (e) => {
        e.preventDefault();
        // TODO: 아이디 찾기 처리
        alert("아이디 찾기 기능은 아직 구현되지 않았어요!");
    };

    const handleFindPassword = (e) => {
        e.preventDefault();
        // TODO: 비밀번호 재설정 메일 전송 처리
        alert("비밀번호 재설정 링크가 이메일로 전송됩니다.");
    };

    return (
        <div className="Forgot">
            <div className="Forgot-Box">
                <h2>아이디 / 비밀번호 찾기</h2>
                <form className="Forgot-Form" onSubmit={handleFindId}>
                    <p className="section-title">아이디 찾기</p>
                    
                    <input type="email" placeholder="가입한 이메일 입력" required />
                    <button type="submit" className="forgot-button">아이디 찾기</button>
                </form>

                <form className="Forgot-Form" onSubmit={handleFindPassword}>
                    <p className="section-title">비밀번호 찾기</p>
                    <input type="text" placeholder="아이디 입력" required />
                    <input type="email" placeholder="가입한 이메일 입력" required />
                    <button type="submit" className="forgot-button">비밀번호 재설정 메일 보내기</button>
                </form>
                <p className="login"><Link to="/">로그인 화면으로 돌아가기기</Link></p>
            </div>           
        </div>
    );
};

export default Forgot;
