package com.korea.board.config;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;

@Component
public class FileStorageUtil {

	@Value("${file.upload-dir}")
	private String uploadDir;

	public String saveFile(MultipartFile file) throws IOException {
		if (file.isEmpty())
			return null;

		String originalFilename = file.getOriginalFilename();
		String ext = originalFilename.substring(originalFilename.lastIndexOf("."));
		String uuid = UUID.randomUUID().toString();
		String newFileName = uuid + ext;

		Path savePath = Paths.get(uploadDir, newFileName);
		Files.createDirectories(savePath.getParent());
		Files.copy(file.getInputStream(), savePath, StandardCopyOption.REPLACE_EXISTING);

		// React에서 접근 가능한 URL 경로 리턴
		return "/uploads/" + newFileName;
	}

	public void deleteFile(String imageUrl) {
		if (imageUrl == null || imageUrl.isEmpty())
			return;

		// imageUrl 예: "/uploads/uuid-filename.jpg"
		String fileName = Paths.get(imageUrl).getFileName().toString();
		Path filePath = Paths.get(uploadDir).resolve(fileName);

		try {
			Files.deleteIfExists(filePath);
		} catch (IOException e) {
			// 로깅 추가 가능
			System.err.println("파일 삭제 실패: " + filePath);
		}
	}

}
