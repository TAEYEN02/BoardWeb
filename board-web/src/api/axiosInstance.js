import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:10000/", // 백엔드가 실제로 돌고 있는 주소
  // 필요하면 헤더, 타임아웃 등 추가 가능
});

export default instance;