package com.korea.board.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "board")
public class Board {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	 private Long id;

    private String title;

//    @Column(columnDefinition = "TEXT")
    @Column(length = 10000)
    private String content;

    private String imageUrl;
    
    @Column(name = "\"day\"")
    private LocalDate day;

    @Builder.Default
    private int liked = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
