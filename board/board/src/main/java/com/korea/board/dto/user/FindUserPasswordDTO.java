package com.korea.board.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindUserPasswordDTO {
	private String userId;
	private String email;
	private String newPassword;
}
