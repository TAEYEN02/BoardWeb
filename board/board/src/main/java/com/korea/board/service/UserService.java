package com.korea.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.korea.board.model.User;
import com.korea.board.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import com.korea.board.config.JwtTokenProvider;
import com.korea.board.dto.user.LoginResponseDTO;
import com.korea.board.dto.user.UserLoginDTO;
import com.korea.board.dto.user.UserSignupDTO;

@Service
@RequiredArgsConstructor
public class UserService {

	@Autowired
	public UserRepository repository;
	@Autowired
	public PasswordEncoder passwordEncoder;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	
	public UserSignupDTO create(User user){
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User saved = repository.save(user);
		return new UserSignupDTO(saved);
	} //본인 정보만 필요하기 때문에 전체 List 안쓰고 그냥 save만
	
	//로그인 로직
	public LoginResponseDTO login(UserLoginDTO dto) {
	    User user = repository.findByUserId(dto.getUserId())
	        .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자 입니다"));

	    if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
	        throw new RuntimeException("비밀번호가 일치하지 않습니다");
	    }

	    String token = jwtTokenProvider.generateToken(user.getUserId()); // ✅ 토큰 생성

	    return new LoginResponseDTO(user.getUserId(), user.getNickname(), token); // ✅ 응답에 포함
	}

	
	//아이디 찾기
	public String findUserIdByemail(String email) {
		User user = repository.findByEmail(email)
						.orElseThrow(()->new RuntimeException("등록된 이메일이 없습니다"));
		return user.getUserId();
	}
	
	//비밀번호 찾기
	public void resetPassword(String userId, String email, String newPassword) {
		User user = repository.findByUserIdAndEmail(userId, email)
					.orElseThrow(()-> new RuntimeException("일치하는 계정을 찾을 수 없습니다"));
		user.setPassword(passwordEncoder.encode(newPassword));
		repository.save(user);
	}
}
