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
public class UserUpdateDTO {
	private String password;
	private String nickname;
	private String email;
	
	public UserUpdateDTO(User user) {
		this.password = user.getPassword();
		this.nickname = user.getNickname();
		this.email = user.getEmail();
	}
	
	public User toEntity() {
		return User.builder()
					.password(password)
					.nickname(nickname)
					.email(email)
					.build();
	}
}
