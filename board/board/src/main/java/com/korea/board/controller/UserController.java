package com.korea.board.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korea.board.dto.user.FindUserIdDTO;
import com.korea.board.dto.user.FindUserPasswordDTO;
import com.korea.board.dto.user.LoginResponseDTO;
import com.korea.board.dto.user.UserDeleteDTO;
import com.korea.board.dto.user.UserLoginDTO;
import com.korea.board.dto.user.UserSignupDTO;
import com.korea.board.dto.user.UserUpdateDTO;
import com.korea.board.model.User;
import com.korea.board.security.CustomUserDetails;
import com.korea.board.service.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = {"http://localhost:3000", "https://app.taeyeon02.store"}, allowCredentials = "true")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {
	
	public final UserService service;
	
	@PostMapping("/signup") // 회원가입
	public ResponseEntity<?> create(@RequestBody UserSignupDTO dto) {
	    if (!dto.isPasswordConfirmed()) {
	        return ResponseEntity
	            .badRequest()
	            .body("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
	    }

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
	@GetMapping("/check-nickname")//닉네임 중복 확인
	public ResponseEntity<?> checkNicknameDuplicate(@RequestParam("nickname") String nickname) {
	    boolean exists = service.isNicknameDuplicate(nickname);
	    return ResponseEntity.ok(exists);  // true면 중복됨
	}

	@GetMapping("/check-userid") // 아이디 중복 확인
	public ResponseEntity<?> checkUserIdDuplicate(@RequestParam("userId") String userId) {
	    boolean exists = service.isUserIdDuplicate(userId);
	    return ResponseEntity.ok(exists); // true면 중복됨
	}

	@GetMapping("/check-email") // 이메일 중복 확인
	public ResponseEntity<?> checkEmailDuplicate(@RequestParam("email") String email) {
	    boolean exists = service.isEmailDuplicate(email);
	    return ResponseEntity.ok(exists); // true면 중복됨
	}

	@PutMapping("") // 프로필 수정
	public ResponseEntity<?> updateUser(@RequestBody UserUpdateDTO dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
		User updatedUser = service.updateProfile(userDetails.getUsername(), dto);
		return ResponseEntity.ok(updatedUser);
	}

	@DeleteMapping("") // 회원 탈퇴
	public ResponseEntity<?> deleteUser(@RequestBody UserDeleteDTO dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
		service.deleteUser(userDetails.getUsername(), dto.getPassword());
		return ResponseEntity.ok("회원 탈퇴가 성공적으로 처리되었습니다.");
	}
}