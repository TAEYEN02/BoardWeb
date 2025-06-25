package com.korea.board.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.korea.board.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUserId(String userId);

	Optional<User> findByEmail(String email);

	Optional<User> findByUserIdAndEmail(String userId, String email);
	
	boolean existsByNickname(String nickName);
	boolean existsByUserId(String userId);
	boolean existsByEmail(String email);
}
