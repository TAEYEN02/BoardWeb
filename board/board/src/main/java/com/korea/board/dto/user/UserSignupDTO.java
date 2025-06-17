package com.korea.board.dto.user;

import com.korea.board.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSignupDTO {
	private String userId;
	private String userName;
	private String email;
	private String password;
	private String nickname;
	
	public UserSignupDTO (User user) {
		this.userId = user.getUserId();
		this.userName = user.getUserName();
		this.email = user.getEmail();
		this.password = user.getPassword();
		this.nickname = user.getNickname();
	}
	
	public static User toEntity(UserSignupDTO dto) {
		return User.builder()
					.userId(dto.userId)
					.userName(dto.userName)
					.email(dto.email)
					.password(dto.password)
					.nickname(dto.nickname)
					.build();
	}
	
}
