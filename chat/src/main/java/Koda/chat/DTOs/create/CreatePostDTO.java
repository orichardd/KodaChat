package Koda.chat.DTOs.create;

import jakarta.validation.constraints.NotBlank;

public record CreatePostDTO(
        @NotBlank
        String title,
        @NotBlank
        String content
) {
}
