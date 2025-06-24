package com.korea.board.dto.board;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardCreateDTO {
	private String title;
    private String content;
    private LocalDate day;
    private MultipartFile image;

}