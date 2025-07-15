import instance from "./axiosInstance";

const API_BASE_URL = '/auth';

// 요청 인터셉터 (헤더에 토큰 추가)
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


export const signup = (userData) => {
    return instance.post(`${API_BASE_URL}/signup`, userData);
};

export const login = async (credentials) => {
    const response = await instance.post(`${API_BASE_URL}/login`, credentials);
    if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const findId = (data) => {
    return instance.post(`${API_BASE_URL}/findId`, data);
};

export const findPassword = (data) => {
    return instance.post(`${API_BASE_URL}/findPassword`, data);
};

export const checkNickname = (nickname) => {
    return instance.get(`${API_BASE_URL}/check-nickname?nickname=${nickname}`);
};

export const checkUserId = (userId) => {
    return instance.get(`${API_BASE_URL}/check-userid?userId=${userId}`);
};

export const deleteUser = (userId, password) => {
  return instance.request({
    url: `${API_BASE_URL}/${userId}`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    data: { password }, // @RequestBody에 들어갈 데이터
    withCredentials: true, // 쿠키 인증 등을 쓰는 경우
  });
};

