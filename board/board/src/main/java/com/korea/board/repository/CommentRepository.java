package com.korea.board.repository;

import com.korea.board.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import com.korea.board.model.User;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoardIdOrderByCreatedAtAsc(Long boardId);
    void deleteByUser(User user);
}
