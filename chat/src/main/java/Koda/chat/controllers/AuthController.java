package Koda.chat.controllers;

import Koda.chat.DTOs.UserDTO;
import Koda.chat.models.User;
import Koda.chat.services.JWTService;
import Koda.chat.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;


    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody @Valid UserDTO dto){
        User user = userService.Login(dto);
        String token = jwtService.GenerateToken(user.getUsername());

        System.out.println("token: " + token);
        return ResponseEntity.ok(Map.of("token", token));
    }


}
