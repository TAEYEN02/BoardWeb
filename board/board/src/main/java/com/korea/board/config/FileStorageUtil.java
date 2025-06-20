package com.korea.board.config;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Component
public class FileStorageUtil {

    private final String uploadDir = "src/main/resources/static/uploads";

    public String saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) return null;

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
}

