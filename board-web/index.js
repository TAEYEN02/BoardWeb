const express = require('express');
const path = require('path');
const app = express();

// Elastic Beanstalk이 포트를 환경 변수로 제공하면 그 포트를 사용하고,
// 그렇지 않으면 로컬 개발을 위해 8080 포트를 사용합니다.
const port = process.env.PORT || 8080;

// React 앱의 빌드 결과물이 있는 'build' 폴더를 정적 파일로 제공합니다.
app.use(express.static(path.join(__dirname, 'build')));

// 어떤 경로로 요청이 들어오더라도, React 앱의 진입점인 index.html을 보여줍니다.
// 이를 통해 React Router가 클라이언트 사이드 라우팅을 처리할 수 있습니다.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});