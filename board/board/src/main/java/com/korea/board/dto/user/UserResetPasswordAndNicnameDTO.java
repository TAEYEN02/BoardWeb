package com.korea.board.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResetPasswordAndNicnameDTO {
	
	private String email;
	private String newPassword;
	private String newNicName;
	
}
