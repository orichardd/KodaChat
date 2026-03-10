package Koda.chat.DTOs;

import jakarta.validation.constraints.NotBlank;

import java.util.Date;

public record CommentDTO(
    @NotBlank
    String content,
    @NotBlank
    String date,
    @NotBlank
    String username
) {
}
