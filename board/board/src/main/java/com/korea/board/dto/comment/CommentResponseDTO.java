package com.korea.board.dto.comment;

import com.korea.board.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private String writerNickname;
    private String userId;

    public CommentResponseDTO(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
        if (comment.getUser() != null) {
            this.writerNickname = comment.getUser().getNickname();
            this.userId = comment.getUser().getUserId();
        }
    }
}
