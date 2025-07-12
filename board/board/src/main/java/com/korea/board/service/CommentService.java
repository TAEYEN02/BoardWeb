package com.korea.board.service;

import com.korea.board.dto.comment.CommentCreateDTO;
import com.korea.board.dto.comment.CommentResponseDTO;
import com.korea.board.model.Board;
import com.korea.board.model.Comment;
import com.korea.board.model.User;
import com.korea.board.repository.BoardRepository;
import com.korea.board.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;

    public List<CommentResponseDTO> getCommentsByBoardId(Long boardId) {
        return commentRepository.findByBoardIdOrderByCreatedAtAsc(boardId).stream()
                .map(CommentResponseDTO::new)
                .collect(Collectors.toList());
    }

    public CommentResponseDTO addComment(CommentCreateDTO dto, User user) {
        Board board = boardRepository.findById(dto.getBoardId())
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        Comment comment = Comment.builder()
                .content(dto.getContent())
                .board(board)
                .user(user)
                .build();

        Comment savedComment = commentRepository.save(comment);
        return new CommentResponseDTO(savedComment);
    }

    public void deleteComment(Long commentId, User user) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));

        if (!comment.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("댓글을 삭제할 권한이 없습니다.");
        }

        commentRepository.delete(comment);
    }
}
