package com.korea.board.dto.board;

import java.time.LocalDate;

import com.korea.board.model.Board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardResponseDTO {
    private Long id;
    private String title;
    private String content;
    private String imageUrl;
    private LocalDate day;
    private int liked;
    private String writer;

    public BoardResponseDTO(Board board) {
        this.id = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.imageUrl = board.getImageUrl();
        this.day = board.getDay();
        this.liked = board.getLiked();
        this.writer = board.getUser().getNickname();
    }
}