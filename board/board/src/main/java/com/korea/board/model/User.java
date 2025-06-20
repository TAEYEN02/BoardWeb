package com.korea.board.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy =GenerationType.AUTO)
	private Long id;
	
	 
	@Column(unique = true, nullable = false)
	private String userId; // 사용자가 입력하는 ID (로그인용)
	
	private String userName;
	
	@Column(nullable = false, unique = true)
	private String email;//이메일(아이디/비번 찾기)
	
	@Column(nullable = false)
	private String password;
	private String nickname;	
}
