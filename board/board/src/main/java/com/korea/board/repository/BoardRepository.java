package com.korea.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.korea.board.model.Board;

import com.korea.board.model.User;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long>{
	 List<Board> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String titleKeyword, String contentKeyword);
	 List<Board> findByUserUserId(String userId);
	 void deleteByUser(User user);
}
