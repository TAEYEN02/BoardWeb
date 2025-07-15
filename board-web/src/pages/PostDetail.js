import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getBoardById, updateBoard, deleteBoard } from '../api/boardApi';

const PageContainer = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 40px auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

const Author = styled.p`
  font-size: 1.1em;
  color: #666;
  margin-bottom: 25px;
`;

const Content = styled.div`
  font-size: 1.1em;
  line-height: 1.8;
  color: #444;
  margin-bottom: 30px;
  white-space: pre-wrap; /* Preserve whitespace and line breaks */
`;

const PostImage = styled.img`
  max-width: 100%;
  max-height: 400px; /* 원하는 최대 높이로 조절하세요 */
  height: auto;
  object-fit: contain; /* 이미지가 잘리지 않고 비율 유지 */
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  margin-right: 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const CancelButton = styled(ActionButton)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1.5em;
  box-sizing: border-box;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1.1em;
  line-height: 1.6;
  min-height: 200px;
  box-sizing: border-box;
  resize: vertical;
`;

const ImageUploadContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
  margin-top: 10px;
`;

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // New state for file upload
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview
  const [deleteExistingImage, setDeleteExistingImage] = useState(false); // New state for image deletion

  const SERVER_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
  const storedUser = localStorage.getItem('user');
  console.log('Stored User from localStorage:', storedUser); // Add this line
  const currentUserId = storedUser ? JSON.parse(storedUser)?.userId : undefined;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getBoardById(id);
        setPost(response.data);
        setEditedTitle(response.data.title);
        setEditedContent(response.data.content);
        setImagePreview(response.data.imageUrl); // Set initial image preview
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("게시물을 불러오는 데 실패했습니다.");
      }
    };

    fetchPost();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setDeleteExistingImage(false); 
    } else {
      setImagePreview(post?.imageUrl || null);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Revert changes
    if (post) {
      setEditedTitle(post.title);
      setEditedContent(post.content);
      setImagePreview(post.imageUrl);
      setSelectedFile(null);
      setDeleteExistingImage(false);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', editedTitle);
      formData.append('content', editedContent);
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (deleteExistingImage) {
        formData.append('deleteImage', 'true'); 
      }

      await updateBoard(id, formData);
      setPost(prevPost => ({
        ...prevPost,
        title: editedTitle,
        content: editedContent,
        imageUrl: selectedFile ? URL.createObjectURL(selectedFile) : (deleteExistingImage ? null : prevPost.imageUrl),
      }));
      setIsEditing(false);
      navigate('/mypage'); // Navigate back to MyPage after saving
    } catch (error) {
      console.error("Error updating post:", error);
      alert("게시물 업데이트에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try {
        await deleteBoard(id);
        alert("게시물이 성공적으로 삭제되었습니다.");
        navigate('/board'); // Navigate to board list after deletion
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("게시물 삭제에 실패했습니다.");
      }
    }
  };

  if (!post) {
    return <PageContainer>게시물을 불러오는 중...</PageContainer>;
  }

  return (
    <PageContainer>
      {isEditing ? (
        <>
          <StyledInput
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <StyledTextarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <ImageUploadContainer>
            <label htmlFor="image-upload">사진 변경:</label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {imagePreview && !deleteExistingImage && (
              <ImagePreview src={imagePreview} alt="미리보기" />
            )}
            {post.imageUrl && (
              <div>
                <input
                  type="checkbox"
                  id="delete-image"
                  checked={deleteExistingImage}
                  onChange={(e) => {
                    setDeleteExistingImage(e.target.checked);
                    if (e.target.checked) {
                      setSelectedFile(null); // If deleting, clear selected file
                      setImagePreview(null); // Clear preview
                    } else {
                      setImagePreview(post.imageUrl); // Revert preview if unchecking
                    }
                  }}
                />
                <label htmlFor="delete-image">기존 사진 삭제</label>
              </div>
            )}
          </ImageUploadContainer>
          <ActionButton onClick={handleSave}>완료</ActionButton>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
        </>
      ) : (
        <>
          <Title>{post.title}</Title>
          <Author>작성자: {post.writer || '알 수 없음'}</Author>
          <p>작성일: {post.day}</p>
          {post.imageUrl && <PostImage src={`${SERVER_BASE_URL}${post.imageUrl}`} alt={post.title} />}
          <Content>{post.content}</Content>
          {console.log('Post User ID:', post.userId)}
          {console.log('Current User ID:', currentUserId)}
          {post.userId === currentUserId && (
            <>
              <ActionButton onClick={handleEdit}>수정하기</ActionButton>
              <CancelButton onClick={handleDelete}>삭제하기</CancelButton>
            </>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default PostDetail;
