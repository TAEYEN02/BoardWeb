package com.korea.board.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
import com.korea.board.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(origins = "http://localhost:3001", allowCredentials = "true")
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

	@PutMapping("/{userId}") // 프로필 수정
	public ResponseEntity<?> updateUser(@PathVariable("userId") String userId, @RequestBody UserUpdateDTO dto) {
		User updatedUser = service.updateProfile(userId, dto);
		// 프론트엔드에서 필요한 사용자 정보를 다시 DTO에 담아 반환할 수 있습니다.
		// 여기서는 간단히 업데이트된 User 객체를 반환합니다.
		return ResponseEntity.ok(updatedUser);
	}

	@DeleteMapping("/{userId}") // 회원 탈퇴
	public ResponseEntity<?> deleteUser(@PathVariable("userId") String userId, @RequestBody UserDeleteDTO dto) {
		service.deleteUser(userId, dto.getPassword());
		return ResponseEntity.ok("회원 탈퇴가 성공적으로 처리되었습니다.");
	}
}
