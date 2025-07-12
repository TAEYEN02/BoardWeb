package com.korea.board.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Value("${file.upload-dir}")
	private String uploadDir;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // 모든 경로에 대해
				.allowedOrigins("http://localhost:3000") // 허용할 출처
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 메서드
				.allowedHeaders("*") // 모든 헤더 허용
				.allowedMethods("*")// 모든 메서드 허용
				.allowCredentials(true);
	}

	// 정적 리소스 매핑 설정 추가
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		String resourceLocation = "file:///" + uploadDir;
		if (!uploadDir.endsWith("/")) {
			resourceLocation += "/";
		}

		registry.addResourceHandler("/uploads/**")
				.addResourceLocations(resourceLocation);
	}
}
