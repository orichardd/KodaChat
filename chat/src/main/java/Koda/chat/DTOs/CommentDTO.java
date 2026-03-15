package Koda.chat.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record CommentDTO(
    @NotBlank
    String content,
    @NotBlank
    String date,
    @NotBlank
    String username,
    @NotNull
    Long comment_id
) {
}
