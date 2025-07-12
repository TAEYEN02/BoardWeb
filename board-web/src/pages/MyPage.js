import { useState, useEffect } from "react";
import { UserProfile, MyPostList } from "../component/index";
import { getBoardsByUserId } from "../api/boardApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MyPageContainer = styled.div`
  background-color: #f4f6f8;
  min-height: 100vh;
  padding: 40px 20px;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const WriteButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      const fetchPosts = async () => {
        try {
          const response = await getBoardsByUserId(parsedUser.userId); 
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchPosts();
    }
  }, []);

  const handleWriteClick = () => {
    navigate("/write");
  };

  return (
    <MyPageContainer>
      <ContentLayout>
        <div>
          {user ? <UserProfile user={user} /> : <p>Loading...</p>}
        </div>

        {/* Right Column */}
        <MainContent>
          <PageHeader>
            <Title>글 쓰기</Title>
            <WriteButton onClick={handleWriteClick}>새 글 작성</WriteButton>
          </PageHeader>
          <MyPostList posts={posts} />
        </MainContent>
      </ContentLayout>
    </MyPageContainer>
  );
};

export default MyPage;
