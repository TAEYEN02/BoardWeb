package com.korea.board.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	http.cors(cors -> cors.configurationSource(corsConfigurationSource())); 
    	
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // JWT이므로 세션 사용 안함
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/","/auth/signup", "/auth/login", "/auth/findId", "/auth/findPassword", "/auth/check-nickname", "/auth/check-userid", "/h2-console/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/auth/{userId}").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/auth/{userId}").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/auth/*").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/boards/**").permitAll() // 게시글 조회는 전체 공개
                .requestMatchers(HttpMethod.POST, "/api/boards").authenticated() // 게시글 작성은 로그인 필요
                .requestMatchers(HttpMethod.PUT, "/api/boards/**").authenticated() //put(update)권한 추가
                .requestMatchers(HttpMethod.DELETE, "/api/boards/**").authenticated() //delete 권한 까지
                .requestMatchers(HttpMethod.POST, "/api/boards/{boardId}/like").permitAll() // 좋아요는 모든 사용자 허용
                .requestMatchers(HttpMethod.GET, "/api/boards/{boardId}/comments").permitAll() // 댓글 조회는 모든 사용자 허용
                .requestMatchers(HttpMethod.POST, "/api/boards/{boardId}/comments").authenticated() // 댓글 작성은 로그인 필요
                .requestMatchers( "/", "/favicon.ico", "/css/**", "/js/**", "/images/**", "/uploads/**").permitAll()//정적 파일 접근 권한 모두 허용
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() //Preflight 요청 (OPTIONS) 허용 여부
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // JWT 필터 등록

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 로그인 시 수동 인증이 필요한 경우 사용
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "https://app.taeyeon02.store"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}