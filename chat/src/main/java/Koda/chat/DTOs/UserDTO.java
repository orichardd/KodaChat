package Koda.chat.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UserDTO(
        @NotBlank
        @Pattern(regexp = "\\S+", message = "Username não pode conter espaços")
        String username,
        @NotBlank
        @Pattern(regexp = "\\S+", message = "Password não pode conter espaços")
        String password
) {
}
