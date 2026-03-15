package Koda.chat.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PostDTO(
        @NotNull
        Long id,
        @NotBlank
        String title,
        @NotBlank
        String content,
        @NotBlank
        String date,
        @NotBlank
        String username,
        @NotBlank
        Integer picture_num
) {
}
