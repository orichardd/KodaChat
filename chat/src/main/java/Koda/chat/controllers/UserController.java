package Koda.chat.controllers;

import Koda.chat.DTOs.SimpleUserDTO;
import Koda.chat.DTOs.UserDTO;
import Koda.chat.DTOs.create.CreateUserDTO;
import Koda.chat.models.User;
import Koda.chat.services.JWTService;
import Koda.chat.services.UserService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> CreateUser(@RequestBody @Valid CreateUserDTO dto){
        User user = userService.CreateUser(dto);
        return ResponseEntity.status(201).body("Usuário criado com sucesso");
    }

    @PostMapping("/getUser")
    public ResponseEntity<?> GetUser(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.status(201).body(userService.GetUser(username));
    }

    @GetMapping("/getUser/{username}")
    public ResponseEntity<?> GetUserByUsername(@PathVariable String username){
        return ResponseEntity.status(201).body(userService.GetUserByUsername(username));
    }

    @GetMapping("/test")
    public String Test(){
        return "Test";
    }

}
