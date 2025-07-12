package com.korea.board.service;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.korea.board.model.User;
import com.korea.board.repository.BoardRepository;
import com.korea.board.repository.CommentRepository;
import com.korea.board.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import com.korea.board.config.JwtTokenProvider;
import com.korea.board.dto.user.LoginResponseDTO;
import com.korea.board.dto.user.UserLoginDTO;
import com.korea.board.dto.user.UserSignupDTO;
import com.korea.board.dto.user.UserUpdateDTO;

@Service
@RequiredArgsConstructor
public class UserService {

	@Autowired
	public UserRepository repository;
	@Autowired
	public PasswordEncoder passwordEncoder;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	@Autowired
	private BoardRepository boardRepository;
	@Autowired
	private CommentRepository commentRepository;

	// 유효성 검사
	private void validateUserInfo(String userId, String email, String password) {
		if (!userId.matches("^[a-zA-Z0-9]{4,20}$")) {
			throw new IllegalArgumentException("아이디는 영문과 숫자를 포함해 4~20자여야 합니다.");
		}

		if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
			throw new IllegalArgumentException("유효한 이메일 형식이 아닙니다.");
		}

		if (!password.matches("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$")) {
			throw new IllegalArgumentException("비밀번호는 8자 이상이며, 영문/숫자/특수문자를 포함해야 합니다.");
		}
	}

	// 회원가입
	public UserSignupDTO create(User user) {
	    if (repository.existsByNickname(user.getNickname())) {
	        throw new RuntimeException("이미 사용 중인 닉네임입니다");
	    }
	    if (repository.existsByUserId(user.getUserId())) {
	        throw new RuntimeException("이미 사용 중인 아이디입니다");
	    }

	    validateUserInfo(user.getUserId(), user.getEmail(), user.getPassword());

	    user.setPassword(passwordEncoder.encode(user.getPassword()));
	    User saved = repository.save(user);
	    return new UserSignupDTO(saved);
	}// 본인 정보만 필요하기 때문에 전체 List 안쓰고 그냥 save만

	// 로그인 로직
	public LoginResponseDTO login(UserLoginDTO dto) {
		User user = repository.findByUserId(dto.getUserId()).orElseThrow(() -> new RuntimeException("존재하지 않는 사용자 입니다"));

		if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
			throw new RuntimeException("비밀번호가 일치하지 않습니다");
		}

		String token = jwtTokenProvider.generateToken(user.getUserId()); // ✅ 토큰 생성

		return new LoginResponseDTO(user.getUserId(), user.getNickname(), token); // ✅ 응답에 포함
	}

	// 아이디 찾기
	public String findUserIdByemail(String email) {
		User user = repository.findByEmail(email).orElseThrow(() -> new RuntimeException("등록된 이메일이 없습니다"));
		return user.getUserId();
	}

	// 비밀번호 찾기
	public void resetPassword(String userId, String email, String newPassword) {
		
		validateUserInfo(userId, email, newPassword);
		
		User user = repository.findByUserIdAndEmail(userId, email)
				.orElseThrow(() -> new RuntimeException("일치하는 계정을 찾을 수 없습니다"));
		user.setPassword(passwordEncoder.encode(newPassword));
		repository.save(user);
	}

	// 닉네임 중복확인
	public boolean isNicknameDuplicate(String nickname) {
		return repository.existsByNickname(nickname);
	}

	// 아이디 중복확인
	public boolean isUserIdDuplicate(String userId) {
		return repository.existsByUserId(userId);
	}

	// 프로필 업데이트
	public User updateProfile(String userId, UserUpdateDTO dto) {
		User user = repository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

		// 닉네임 중복 확인 (자기 자신은 제외)
		if (dto.getNickname() != null && !user.getNickname().equals(dto.getNickname()) && repository.existsByNickname(dto.getNickname())) {
			throw new RuntimeException("이미 사용 중인 닉네임입니다.");
		}

		// 닉네임 업데이트
		if (dto.getNickname() != null) {
			user.setNickname(dto.getNickname());
		}

		// 비밀번호 업데이트
		if (dto.getNewPassword() != null && !dto.getNewPassword().isEmpty()) {
			if (dto.getCurrentPassword() == null || !passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
				throw new RuntimeException("현재 비밀번호가 일치하지 않습니다.");
			}
            // 새 비밀번호 유효성 검사 (아이디, 이메일은 변경되지 않으므로 기존 값 사용)
            validateUserInfo(user.getUserId(), user.getEmail(), dto.getNewPassword());

			user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
		}

		return repository.save(user);
	}

	// 회원 탈퇴
	public void deleteUser(String userId, String password) {
	    String authenticatedUserId = SecurityContextHolder.getContext().getAuthentication().getName();
	    System.out.println("Authenticated userId: " + authenticatedUserId);

	    if (!authenticatedUserId.equals(userId)) {
	        throw new AccessDeniedException("자신의 계정만 탈퇴할 수 있습니다.");
	    }

	    User user = repository.findByUserId(userId)
	            .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

	    if (!passwordEncoder.matches(password, user.getPassword())) {
	        throw new RuntimeException("비밀번호가 일치하지 않습니다.");
	    }

	    commentRepository.deleteByUser(user);
	    boardRepository.deleteByUser(user);
	    repository.delete(user);
	}



}
