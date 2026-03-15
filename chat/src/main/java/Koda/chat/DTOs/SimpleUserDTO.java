package Koda.chat.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SimpleUserDTO(
        @NotBlank
        String username,
        @NotNull
        Integer picture_num,
        @NotBlank
        String created_date
) {
}
