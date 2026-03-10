package Koda.chat.DTOs.create;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record CreateUserDTO(

        @NotBlank
        @Pattern(regexp = "\\S+", message = "Username não pode conter espaços")
        String username,

        @NotBlank
        @Pattern(regexp = "\\S+", message = "Password não pode conter espaços")
        String password,

        @NotNull
        Integer picture_num
) {
}