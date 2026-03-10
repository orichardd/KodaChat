package Koda.chat.controllers;

import Koda.chat.DTOs.UserDTO;
import Koda.chat.DTOs.create.CreateUserDTO;
import Koda.chat.models.User;
import Koda.chat.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> CreateUser(@RequestBody @Valid CreateUserDTO dto){
        User user = userService.CreateUser(dto);
        return ResponseEntity.status(201).body("Usuário criado com sucesso");
    }

    @GetMapping("/test")
    public String Test(){
        return "Test";
    }

}
