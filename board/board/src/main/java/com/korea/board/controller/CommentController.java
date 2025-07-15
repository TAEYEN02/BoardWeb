package com.korea.board.controller;

import com.korea.board.dto.comment.CommentCreateDTO;
import com.korea.board.dto.comment.CommentResponseDTO;
import com.korea.board.security.CustomUserDetails;
import com.korea.board.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards/{boardId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentResponseDTO>> getCommentsByBoardId(@PathVariable("boardId") Long boardId) {
        List<CommentResponseDTO> comments = commentService.getCommentsByBoardId(boardId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<CommentResponseDTO> addComment(@PathVariable("boardId") Long boardId,
                                                         @RequestBody CommentCreateDTO dto,
                                                         @AuthenticationPrincipal CustomUserDetails userDetails) {
        dto.setBoardId(boardId);
        CommentResponseDTO newComment = commentService.addComment(dto, userDetails.getUser());
        return ResponseEntity.ok(newComment);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Long commentId,
                                              @AuthenticationPrincipal CustomUserDetails userDetails) {
        commentService.deleteComment(commentId, userDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
