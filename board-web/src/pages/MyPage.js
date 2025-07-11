import "../css/MyPage.css";
import { UserProfile, MyPostList, MyCalendar } from "../component/index";
import { dummyPosts, dummyUser, dummyTodos } from "./MyPage/dummyData";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    align-items: center;
    justify-content: center;

`;

const UserProfileSection = styled.div`
    margin-bottom: 30px;
    display: flex;
    flex-direction: center;
    justify-content: center;
    align-items: center;
    
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
`;

const MyPage = () => {
    return (
        <Container>
             <Title>마이페이지</Title>
            <UserProfileSection>
                <UserProfile user={dummyUser} />
                <MyPostList posts={dummyPosts} />
            </UserProfileSection>

            <MyCalendar todos={dummyTodos} />
        </Container>
    );
};
export default MyPage;