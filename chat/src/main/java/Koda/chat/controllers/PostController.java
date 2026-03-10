package Koda.chat.controllers;

import Koda.chat.DTOs.PostDTO;
import Koda.chat.DTOs.create.CreatePostDTO;
import Koda.chat.services.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/post")
    public ResponseEntity<?> CreateUser(
            @RequestBody @Valid CreatePostDTO dto){

        postService.CreatePost(dto);
        return ResponseEntity.ok("Post criado com sucesso");
    }

    @GetMapping("/getall")
    public List<PostDTO> GetAllPosts(){
        return postService.GetAllPosts();
    }

}
