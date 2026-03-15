package Koda.chat.controllers;

import Koda.chat.DTOs.PostDTO;
import Koda.chat.DTOs.UserDTO;
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
    public ResponseEntity<?> GetAllPosts(){
        List<PostDTO> list = postService.GetAllPosts();
        return ResponseEntity.status(201).body(list);
    }

    @GetMapping("/getposts/{username}")
    public ResponseEntity<?> GetPostByUser(@PathVariable String username ){
        List<PostDTO> posts = postService.GetPostsByUser(username);
        return ResponseEntity.status(201).body(posts);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> GetPostById(@PathVariable Long postId){
        PostDTO dto = postService.GetPostsById(postId);
        return ResponseEntity.status(201).body(dto);
    }

}
