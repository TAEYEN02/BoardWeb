package com.korea.board.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korea.board.dto.user.FindUserIdDTO;
import com.korea.board.dto.user.FindUserPasswordDTO;
import com.korea.board.dto.user.LoginResponseDTO;
import com.korea.board.dto.user.UserLoginDTO;
import com.korea.board.dto.user.UserSignupDTO;
import com.korea.board.model.User;
import com.korea.board.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {
	
	public final UserService service;
	
	@PostMapping("/signup") //회원가입 
	public ResponseEntity<?> create(@RequestBody UserSignupDTO dto){
		User entity = UserSignupDTO.toEntity(dto);
		UserSignupDTO user = service.create(entity); 
		return ResponseEntity.ok(user);
	}
	@PostMapping("/login")//로그인
	public ResponseEntity<?> login(@RequestBody UserLoginDTO dto){
		LoginResponseDTO response = service.login(dto);
		return ResponseEntity.ok(response);
	}
	@PostMapping("/findId")//아이디 찾기
	public ResponseEntity<?> findUserId(@RequestBody FindUserIdDTO dto){
		String userId = service.findUserIdByemail(dto.getEmail());
		return ResponseEntity.ok(userId);
	}
	@PostMapping("/findPassword")//비밀번호 찾기
	public ResponseEntity<?> resetPassword(@RequestBody FindUserPasswordDTO dto){
		service.resetPassword(dto.getUserId(), dto.getEmail(), dto.getNewPassword());
		return ResponseEntity.ok("비밀번호가 재설정 되었습니다");
	}
	@GetMapping("/check-nickname")//아이디 중복 확인
	public ResponseEntity<?> checkNicknameDuplicate(String nickname) {
	    boolean exists = service.isNicknameDuplicate(nickname);
	    return ResponseEntity.ok(exists);  // true면 중복됨
	}

	@GetMapping("/check-userid") // 아이디 중복 확인
	public ResponseEntity<?> checkUserIdDuplicate(String userId) {
	    boolean exists = service.isUserIdDuplicate(userId);
	    return ResponseEntity.ok(exists); // true면 중복됨
	}


}
