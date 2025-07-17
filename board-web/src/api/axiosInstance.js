import axios from "axios";

let backendHost;
const hostname = window && window.location && window.location.hostname;

if(hostname === "localhost"){
    backendHost = "http://localhost:5000";
} else {
  backendHost = "https://api.taeyeon02.store"; // 배포 백엔드 주소
}

const instance = axios.create({
  baseURL: backendHost,
  withCredentials: true, // 필요한 경우 (쿠키 기반 인증 등)
});

export default instance;