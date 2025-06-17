package com.korea.board.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.korea.board.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUserId(String email);
	Optional<User> findByUserIdAndEmail(String userId, String email);
	Optional<User> findByUserName(String userId);
	
}
