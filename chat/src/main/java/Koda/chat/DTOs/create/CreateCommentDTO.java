package Koda.chat.DTOs.create;


import jakarta.validation.constraints.NotBlank;

public record CreateCommentDTO(
        @NotBlank
        String content
) {
}
