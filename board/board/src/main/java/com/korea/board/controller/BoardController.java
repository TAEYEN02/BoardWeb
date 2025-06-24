package com.korea.board.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.korea.board.dto.board.BoardCreateDTO;
import com.korea.board.dto.board.BoardResponseDTO;
import com.korea.board.service.BoardService;
import com.korea.board.security.CustomUserDetails;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService service;

    public BoardController(BoardService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BoardResponseDTO> create(@ModelAttribute BoardCreateDTO dto,
                                                   @AuthenticationPrincipal CustomUserDetails userDetails) {
    	System.out.println(">>> Authenticated user: " + userDetails);
        return ResponseEntity.ok(service.create(dto, userDetails.getUser()));
    }

    @GetMapping
    public List<BoardResponseDTO> getAll(@RequestParam(required = false) String keyword) {
        return (keyword == null || keyword.isEmpty())
                ? service.getAll()
                : service.search(keyword);
    }

    @GetMapping("/{id}")
    public BoardResponseDTO getOne(@PathVariable Long id) {
        return service.getOne(id);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Integer> like(@PathVariable Long id) {
        int updatedLike = service.increaseLike(id);
        return ResponseEntity.ok(updatedLike);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id,
                                       @AuthenticationPrincipal CustomUserDetails userDetails) {
        service.delete(id, userDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
