package Koda.chat.services;

import Koda.chat.DTOs.SimpleUserDTO;
import Koda.chat.DTOs.UserDTO;
import Koda.chat.DTOs.create.CreateUserDTO;
import Koda.chat.models.User;
import Koda.chat.repositories.UserRepository;
import Koda.chat.security.SecurityConfig;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityConfig securityConfig;


    public User CreateUser(CreateUserDTO dto) {
        if(userRepository.existsUserByUsername(dto.username())) {
            throw new RuntimeException("Usuário já existe");
        }
        User user = new User(
                dto.username(),
                securityConfig.passwordEncoder().encode(dto.password()),
                dto.picture_num()
        );
        userRepository.save(user);
        return user;
    }

    public User Login(@Valid UserDTO dto) {

        User user = userRepository.findUserByUsername(dto.username());

        if(user == null){
            throw new RuntimeException("Usuário não encontrado");
        }

        boolean passwordMatch = securityConfig.passwordEncoder().matches(dto.password(), user.getPassword());

        if (!passwordMatch) {
            throw new IllegalArgumentException("Usuário ou senha inválidos");
        }

        return user;
    }

    public SimpleUserDTO GetUser(String username) {
        User user = userRepository.findUserByUsername(username);
        if(user == null){
            throw new IllegalArgumentException("Usuario nao encontrado");
        }
        return new SimpleUserDTO(
                user.getUsername(),
                user.getPicture_num(),
                user.getDate().toString()
        );
    }

    public SimpleUserDTO GetUserByUsername(String username) {
        User user = userRepository.getUserByUsername(username);
        return new SimpleUserDTO(
                user.getUsername(),
                user.getPicture_num(),
                user.getDate().toString()
        );
    }
}
