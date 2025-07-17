import instance from "./axiosInstance";

// 닉네임 중복 확인
export const checkNicknameDuplicate = async (nickname) => {
  const res = await instance.get(`/auth/check-nickname`, {
    params: { nickname },
  });
  return res.data; // true면 중복
};

// 아이디(userId) 중복 확인
export const checkUserIdDuplicate = async (userId) => {
  const res = await instance.get(`/auth/check-userid`, {
    params: { userId },
  });
  return res.data; // true면 중복
};

// 이메일(email) 중복 확인
export const checkUserEmailDuplicate = async (email) => {
  const res = await instance.get(`/auth/check-email`, {
    params: { email },
  });
  return res.data; // true면 중복
};


// 회원가입
export const signup = (userData) => {
  return instance.post(
    `/auth/signup`,
    userData,
    {
      withCredentials: false, // 쿠키 제거
      headers: {} // Authorization 제거
    }
  );
};

// 아이디 찾기
export const findUserId = async (email) => {
  const res = await instance.post("/auth/findId", { email });
  return res.data; // → userId (문자열)
};

// 비밀번호 재설정
export const resetPassword = async (userId, email, newPassword) => {
  const res = await instance.post("/auth/findPassword", {
    userId,
    email,
    newPassword,
  });
  return res.data; // → 성공 메시지
};