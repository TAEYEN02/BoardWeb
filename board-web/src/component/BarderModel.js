import "../css/boardModel.css";
import styled from "styled-components";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from 'react';
import { getCommentsByBoardId, addComment, deleteComment } from '../api/boardApi';

const LikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    color: ${props => props.isLiked ? '#ff0000' : '#666'}; // Red for liked, grey for not liked

    &:hover {
        color: ${props => props.isLiked ? '#cc0000' : '#333'};
    }

    svg {
        font-size: 24px;
    }
`;

const CommentsSectionContainer = styled.div`
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
`;

const CommentsListContainer = styled.div`
    max-height: 200px; /* Scrollable comment list */
    overflow-y: auto;
    margin-bottom: 15px;
    padding-right: 10px; /* For scrollbar */
`;

const CommentItem = styled.div`
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 10px 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CommentAuthor = styled.strong`
    font-size: 15px;
    color: #333;
    margin-right: 8px;
`;

const CommentTimestamp = styled.span`
    font-size: 12px;
    color: #999;
`;

const CommentContent = styled.p`
    font-size: 14px;
    color: #555;
    margin-top: 5px;
    line-height: 1.5;
    white-space: pre-wrap;
`;

const CommentInputArea = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 15px;
`;

const CommentTextarea = styled.textarea`
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    min-height: 60px;
    resize: vertical;
`;

const CommentSubmitButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const DeleteButton = styled.button`
    background: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
`;


const BoardModal = ({ board, onClose, onToggleLike }) => {
    const [comments, setComments] = useState([]);
    const [newCommentContent, setNewCommentContent] = useState('');
    const [currentUserNickname, setCurrentUserNickname] = useState('');

    useEffect(() => {
        const nickname = localStorage.getItem('userNickname');
        if (nickname) {
            setCurrentUserNickname(nickname);
        }

        if (board) {
            const fetchComments = async () => {
                try {
                    const response = await getCommentsByBoardId(board.id);
                    setComments(response.data);
                } catch (error) {
                    console.error("Error fetching comments:", error);
                }
            };
            fetchComments();
        } else {
            setComments([]); // Clear comments when modal is closed
            setNewCommentContent(''); // Clear new comment content
        }
    }, [board]);

    if (!board) return null;

    const handleLikeButtonClick = () => {
        onToggleLike(board.id, board.isLikedByUser);
    };

    const handleAddComment = async () => {
        if (!newCommentContent.trim()) {
            alert("댓글 내용을 입력해주세요.");
            return;
        }
        try {
            const response = await addComment(board.id, newCommentContent);
            setComments(prevComments => [...prevComments, response.data]);
            setNewCommentContent('');
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("댓글 작성에 실패했습니다. 로그인했는지 확인해주세요.");
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            try {
                await deleteComment(board.id, commentId);
                setComments(comments.filter(comment => comment.id !== commentId));
            } catch (error) {
                console.error("Error deleting comment:", error);
                alert("댓글 삭제에 실패했습니다.");
            }
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{board.title}</h2>
                {board.imageUrl && <img src={board.imageUrl} alt={board.title} />}
                <p>{board.content}</p>
                <div className="modal-actions">
                    <LikeButton onClick={handleLikeButtonClick} isLiked={board.isLikedByUser}>
                        {board.isLikedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        <span>{board.liked}</span>
                    </LikeButton>
                </div>

                {/* Comments Section */}
                <CommentsSectionContainer>
                    <h4>댓글</h4>
                    <CommentsListContainer>
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <CommentItem key={comment.id}>
                                    <div>
                                        <CommentAuthor>{comment.writerNickname}</CommentAuthor>
                                        <CommentTimestamp>{comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ''}</CommentTimestamp>
                                        <CommentContent>{comment.content}</CommentContent>
                                    </div>
                                    {console.log('Comment Writer Nickname:', comment.writerNickname, 'Current User Nickname:', currentUserNickname, 'Match:', comment.writerNickname === currentUserNickname)}
                                    {comment.writerNickname === currentUserNickname && (
                                        <DeleteButton onClick={() => handleDeleteComment(comment.id)}>삭제</DeleteButton>
                                    )}
                                </CommentItem>
                            ))
                        ) : (
                            <p>아직 댓글이 없습니다.</p>
                        )}
                    </CommentsListContainer>
                    <CommentInputArea>
                        <CommentTextarea
                            placeholder="댓글을 입력하세요..."
                            value={newCommentContent}
                            onChange={(e) => setNewCommentContent(e.target.value)}
                        ></CommentTextarea>
                        <CommentSubmitButton onClick={handleAddComment}>댓글 달기</CommentSubmitButton>
                    </CommentInputArea>
                </CommentsSectionContainer>
            </div>
        </div>
    );
};

export default BoardModal;
