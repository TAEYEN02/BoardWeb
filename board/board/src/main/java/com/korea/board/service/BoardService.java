package com.korea.board.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.korea.board.config.FileStorageUtil;
import com.korea.board.dto.board.BoardCreateDTO;
import com.korea.board.dto.board.BoardResponseDTO;
import com.korea.board.model.Board;
import com.korea.board.model.User;
import com.korea.board.repository.BoardRepository;

@Service
public class BoardService {

    private final BoardRepository repository;
    private final FileStorageUtil fileUtil;

    public BoardService(BoardRepository repository, FileStorageUtil fileUtil) {
        this.repository = repository;
        this.fileUtil = fileUtil;
    }

    public BoardResponseDTO create(BoardCreateDTO dto, User user) {
        String imageUrl = null;
        if (dto.getImage() != null && !dto.getImage().isEmpty()) {
            try {
                imageUrl = fileUtil.saveFile(dto.getImage());
            } catch (Exception e) {
                throw new RuntimeException("이미지 저장 실패", e);
            }
        }

        Board board = Board.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .imageUrl(imageUrl)
                .day(LocalDate.now())
                .user(user)
                .build();

        return new BoardResponseDTO(repository.save(board));
    }

    public List<BoardResponseDTO> getAll() {
        return repository.findAll().stream()
                .map(BoardResponseDTO::new)
                .toList();
    }

    public List<BoardResponseDTO> search(String keyword) {
        return repository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(keyword, keyword)
                .stream().map(BoardResponseDTO::new)
                .toList();
    }

    public List<BoardResponseDTO> getBoardsByUserId(String userId) {
        return repository.findByUserUserId(userId).stream()
                .map(BoardResponseDTO::new)
                .toList();
    }

    public BoardResponseDTO getOne(Long id) {
        return repository.findById(id)
                .map(BoardResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));
    }

    @Transactional
    public int increaseLike(Long id) {
        Board board = repository.findById(id).orElseThrow(() -> new RuntimeException("게시글 없음"));
        board.setLiked(board.getLiked() + 1);
        return repository.save(board).getLiked();
    }

    public void delete(Long id, User user) {
        Board board = repository.findById(id).orElseThrow(() -> new RuntimeException("게시글 없음"));

        if (!board.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        // 이미지 파일 삭제 로직 추가
        if (board.getImageUrl() != null && !board.getImageUrl().isEmpty()) {
            fileUtil.deleteFile(board.getImageUrl());
        }

        repository.delete(board);
    }

    @Transactional
    public BoardResponseDTO update(Long id, BoardCreateDTO dto, User user) {
        Board board = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));

        // 권한 체크
        if (!board.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

        board.setTitle(dto.getTitle());
        board.setContent(dto.getContent());

        try {
            if (dto.isDeleteImage()) {
                if (board.getImageUrl() != null) {
                    fileUtil.deleteFile(board.getImageUrl());
                    board.setImageUrl(null);
                }
            }

            if (dto.getImage() != null && !dto.getImage().isEmpty()) {
                if (board.getImageUrl() != null) {
                    fileUtil.deleteFile(board.getImageUrl());
                }
                String savedImageUrl = fileUtil.saveFile(dto.getImage());
                board.setImageUrl(savedImageUrl);
            }
        } catch (Exception e) {
            throw new RuntimeException("이미지 처리 실패", e);
        }

        return new BoardResponseDTO(repository.save(board));
    }


}
