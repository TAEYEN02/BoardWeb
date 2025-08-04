# 📝 BoardWeb

> React 기반의 간단한 게시판 웹 애플리케이션

- **배포 링크**: [https://www.taeyeon02.store](https://www.taeyeon02.store)  
- **개발·배포 기간**: 2025.06.20 ~ 2025.07.18

---

## 🎯 주요 기능

### 사용자 관리
- **회원가입**: 아이디/닉네임 중복 확인, 비밀번호 검증, 이메일 입력
- **로그인**: 아이디와 비밀번호 인증
- **ID/비밀번호 찾기**
  - ID: 이름 + 이메일 입력 시 찾기 가능
  - 비밀번호: ID + 이메일 입력 시 그 자리에서 재설정 기능 제공
- **마이페이지**: 본인 정보 및 자신이 작성한 게시글 목록 확인

### 게시판 (Dev 게시판)
- **게시글 작성/수정**: 제목 기반 검색 및 메인 페이지 노출
- **댓글 기능**: 게시글 클릭 시 모달로 댓글 추가/삭제
- **좋아요 기능**: 하트 클릭 시 좋아요 수 증가
- **제목 기반 검색**: 문자열 포함 여부로 게시글 필터링

---

## 🗂 폴더 구조
📦 BoardWeb <br/>
├── board/ # 백엔드 (Spring Boot) <br/>
└── board-web/ # 프론트엔드 (React)

## 🔧 기술 스택

### Backend (`board`)
- **언어**: Java 17
- **프레임워크**: Spring Boot (Spring MVC, Spring Data JPA)
- **보안**: Spring Security + JWT
- **DB**: MySQL (AWS RDS)
- **API 통신**: RESTful

### Frontend (`board-web`)
- **언어**: JavaScript
- **라이브러리**: React
- **라우팅**: React Router
- **통신**: Axios
- **패키지 관리**: npm

### 배포 환경
- **호스팅**: AWS Elastic Beanstalk for backend & frontend
- **파일 저장**: 서버 로컬 파일 시스템 (이미지 저장용)

---

## 🛡 SonarQube 코드 품질 진단 및 개선

### 🔐 Security Hotspot (/index.js)
- **이슈**: Express가 기본적으로 `X-Powered-By: Express` 헤더를 노출함
- **위험**: 프레임워크 버전 노출로 인한 정보 유출 위험
  ```jsx
  const express = require('express');
  const path = require('path');
  const app = express(); //이부분 = This framework implicitly discloses version information by default. Make sure it is safe here.
  ```
- **조치**: `app.disable('x-powered-by')` 설정하여 해결

---

### 💡 Reliability (신뢰성)
- **이슈**: `<div>` 또는 `<span>`을 버튼처럼 사용할 경우 접근성 문제 발생
- **해결 방향**:
  - 가능하면 `<button>` 사용
  - 불가할 경우 ARIA role, tabIndex, onKeyPress 추가

  ```jsx
  <div
   role="button"
    tabIndex="0"
    onClick={handleClick}
    onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}
  >
    Click me
  </div>
  ```
### 🔧 Maintainability (유지보수성)
1. **Optional Chaining 누락**
   - 이슈 메시지 : "Prefer using an optional chain expression instead, as it's more concise and easier to read."
   - 파일 위치 : axiosInstance.js, userApi.js, login.js, index.js
   - **해결 방법** : 코드 가족성을 높여 런타임 오류 예방, 중첩된 객체 접근 할때 조건문을 줄임으로써 유지보수가 쉽도록 해야함.
     ```jsx
     //Before
      if (user && user.profile && user.profile.name) {
        console.log(user.profile.name);
      }

      //After
      console.log(user?.profile?.name);
      ```
   
2. **Props Validation 누락**
     - 이슈 메시지 : 'props.xxx' is missing in props validation
     - 파일 위치 : BarderModel.js, Button.js, Navbar.js, DiaryCard.js
     - **해결방법** : 예상치 못한 타입 전달로 인해 런타임 에러가 발생할 수 있어, 사용방식에 대한 명확안 계약이 중요함으로 PropTypes 또는 TypeScript로 타입 검사를 강화해야함.
        ```jsx
        //Before
        const MyComponent = ({ user }) => <div>{user.name}</div>;

        //After
        import PropTypes from 'prop-types';

        const MyComponent = ({ user }) => <div>{user.name}</div>;

        MyComponent.propTypes = {
          user: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }),
        };
        ```
3. **중첩 삼항 연산자**
   - 이슈 메시지 : "Extract this nested ternary operation into an independent statement."
   - 파일 위치 : PostDetail.js
   - **해결방법** : 중첩된 삼항 연산자는 가독성을 떨어뜨려, 유지보수가 어렵다. 따라서 조건 분기 구조로 리팩토링하여 가독성과 디버깅 효율을 개선해야함.
    ```jsx
     //Before
      const status = isLoading ? 'Loading...' : error ? 'Error' : 'Done';

      //After
      let status;
      if (isLoading) {
        status = 'Loading...';
      } else if (error) {
        status = 'Error';
      } else {
        status = 'Done';
      }
     ```

---

## 🛠 향후 개선 계획

1. **이미지 저장 개선**  
   - 현재 서버 재배포 시 이미지 손실 문제가 있음  
   - AWS S3 도입하여 영구 저장 구현 예정

2. **비밀번호 찾기 보안 강화**  
   - 임시 비밀번호를 이메일로 발급해 사용자 인증 강화 예정

3. **마이페이지 확장**  
   - 사용자 전용 달력형 TODO 기능 추가 예정

4. **좋아요 기능 개선**  
   - 사용자당 1회 좋아요 제한 적용 예정

---


