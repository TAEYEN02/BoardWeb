package com.korea.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.korea.board.model.Comment;
import com.korea.board.model.User;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoardIdOrderByCreatedAtAsc(Long boardId);
    
    void deleteByUser(User user); // ✅ 사용자가 직접 단 댓글 삭제

    // ✅ 추가: 사용자의 게시글에 달린 댓글도 삭제
    @Modifying
    @Transactional
    @Query("DELETE FROM Comment c WHERE c.board.user = :user")
    void deleteByBoardUser(@Param("user") User user);
}
