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
    private String confirmPassword;  // 비밀번호 확인용 필드 추가
    private String nickname;
    
    public UserSignupDTO(User user) {
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.nickname = user.getNickname();
    }
    
    // 비밀번호 확인 일치 여부 검증 메서드
    public boolean isPasswordConfirmed() {
        return password != null && password.equals(confirmPassword);
    }
    
    public static User toEntity(UserSignupDTO dto) {
        return User.builder()
            .userId(dto.getUserId().trim())
            .userName(dto.getUserName().trim())
            .email(dto.getEmail().trim().toLowerCase())
            .password(dto.getPassword())
            .nickname(dto.getNickname().trim())
            .build();
    }
}
