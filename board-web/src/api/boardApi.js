import instance from "./axiosInstance";

const API_BASE_URL = '/api/boards';

// 요청 인터셉터 (헤더에 토큰 추가)
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Sending token:", token); // Add this line for debugging
    } else {
        console.log("No token found in localStorage."); // Add this line for debugging
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const createBoard = (boardData) => {
    // FormData를 사용하므로 Content-Type을 multipart/form-data로 설정
    return instance.post(API_BASE_URL, boardData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getAllBoards = (keyword) => {
    const params = keyword ? { keyword } : {};
    return instance.get(API_BASE_URL, { params });
};

export const getBoardsByUserId = (userId) => {
    return instance.get(`${API_BASE_URL}/user/${userId}`);
};

export const getBoardById = (id) => {
    return instance.get(`${API_BASE_URL}/${id}`);
};

export const likeBoard = (id) => {
    return instance.post(`${API_BASE_URL}/${id}/like`);
};

export const deleteBoard = (id) => {
    return instance.delete(`${API_BASE_URL}/${id}`);
};

export const updateBoard = (id, updatedData) => {
    // FormData를 사용하므로 Content-Type을 multipart/form-data로 설정
    return instance.put(`${API_BASE_URL}/${id}`, updatedData, {
        headers: {
            // 'Content-Type': 'multipart/form-data',
        },
    });
};

export const getCommentsByBoardId = (boardId) => {
    return instance.get(`${API_BASE_URL}/${boardId}/comments`);
};

export const addComment = (boardId, content) => {
    return instance.post(`${API_BASE_URL}/${boardId}/comments`, { content });
};

export const deleteComment = (boardId, commentId) => {
    return instance.delete(`${API_BASE_URL}/${boardId}/comments/${commentId}`);
};
