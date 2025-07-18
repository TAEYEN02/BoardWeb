import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { logout, deleteUser, updateUser } from '../api/userApi';

const UserProfileContainer = styled.div`
  background-color: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 15px;
  border: 3px solid #f0f0f0;
`;

const Nickname = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px 0;
`;

const UserId = styled.p`
  font-size: 16px;
  color: #888;
  margin: 0 0 20px 0;
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 25px;
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

const DeleteButton = styled(EditButton)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FormInput = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SaveButton = styled(EditButton)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled(EditButton)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const MyPostListContainer = styled.div`
  background-color: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PostCard = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }

  h3 {
    margin: 0 0 5px 0;
    font-size: 18px;
    color: #333;
  }

  span {
    font-size: 14px;
    color: #777;
  }
`;


// --- Components ---

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
      setProfileImage(`https://ui-avatars.com/api/?name=${user.nickname}&background=random&size=128`);
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewImageFile(null);
    // Reset nickname to original value from prop
    setNickname(user.nickname || '');
  };

  const handleSaveClick = async () => {
    if (!user || !user.userId) {
      alert("사용자 정보가 없습니다.");
      return;
    }

    if (newPassword && newPassword !== confirmNewPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (newPassword && !currentPassword) {
      alert("비밀번호를 변경하려면 현재 비밀번호를 입력해야 합니다.");
      return;
    }

    const token = localStorage.getItem("token");
    const updateData = { nickname: nickname };

    if (newPassword) {
      updateData.currentPassword = currentPassword;
      updateData.newPassword = newPassword;
    }

    try {
      const updatedUser = await updateUser(updateData);

      const storedUser = JSON.parse(localStorage.getItem('user'));
      storedUser.nickname = updatedUser.data.nickname;
      localStorage.setItem('user', JSON.stringify(storedUser));

      if (newImageFile) {
        setProfileImage(URL.createObjectURL(newImageFile));
      }

      alert('프로필이 성공적으로 업데이트되었습니다.');
      setIsEditing(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      window.location.reload();

    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleWithdrawClick = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.userId) {
      alert("사용자 정보가 없습니다.");
      return;
    }

    if (window.confirm("정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      const password = window.prompt("회원 탈퇴를 계속하려면 비밀번호를 입력하세요:");
      if (!password || password.trim() === '') {
        alert("비밀번호가 입력되지 않았습니다. 회원 탈퇴가 취소되었습니다.");
        return;
      }

      try {
        await deleteUser(password);
        alert("회원 탈퇴가 성공적으로 처리되었습니다.");
        logout();
        window.location.href = '/login';
      } catch (error) {
        console.error("Error during withdrawal:", error);
        alert("회원 탈퇴에 실패했습니다. 비밀번호를 확인하거나 다시 시도해주세요.");
      }
    }
  };


  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <UserProfileContainer>
      <ProfileImage src={profileImage} alt="Profile" />

      {!isEditing ? (
        <>
          <Nickname>{user.nickname}</Nickname>
          <UserId>@{user.userId}</UserId>
          <EditButton onClick={handleEditClick}>프로필 수정</EditButton>
          <DeleteButton onClick={handleWithdrawClick} style={{ marginTop: '10px' }}>탈퇴하기</DeleteButton>
        </>
      ) : (
        <EditForm>
          <label htmlFor="profile-image-upload" style={{ cursor: 'pointer', color: '#007bff', marginBottom: '10px' }}>
            이미지 변경
          </label>
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />

          <FormInput
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
          />
          <FormInput
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호 (변경 시)"
          />
          <FormInput
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호 (변경 시)"
          />
          <FormInput
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="새 비밀번호 확인"
          />
          <ButtonGroup>
            <SaveButton onClick={handleSaveClick}>저장</SaveButton>
            <CancelButton onClick={handleCancelClick}>취소</CancelButton>
          </ButtonGroup>
        </EditForm>
      )}
    </UserProfileContainer>
  );
};

const MyPostList = ({ posts }) => {
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <MyPostListContainer>
      <SectionTitle>내가 쓴 글</SectionTitle>
      <PostList>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} onClick={() => handlePostClick(post.id)}>
              <h3>{post.title}</h3>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </PostCard>
          ))
        ) : (
          <p>작성한 글이 없습니다.</p>
        )}
      </PostList>
    </MyPostListContainer>
  );
};

export { UserProfile, MyPostList };
