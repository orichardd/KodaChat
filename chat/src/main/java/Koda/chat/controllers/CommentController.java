package Koda.chat.controllers;

import Koda.chat.DTOs.CommentDTO;
import Koda.chat.DTOs.PostDTO;
import Koda.chat.DTOs.create.CreateCommentDTO;
import Koda.chat.services.CommentService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/comment/{postId}")
    public ResponseEntity<?> CreateComment(@PathVariable Long postId, @RequestBody CreateCommentDTO dto){
        commentService.CreateComment(postId, dto);
        return ResponseEntity.ok("Comentário criado com sucesso");
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> GetAllCommentsByPost(@PathVariable Long postId) {
        List<CommentDTO> dto = commentService.GetAllCommentsByPost(postId);
        return ResponseEntity.status(201).body(dto);
    }

    @GetMapping("/getcount/{postId}")
    public ResponseEntity<?> GetCommentCountById(@PathVariable Long postId){
        Integer commentsCount = commentService.GetCommentsCountByPostId(postId);
        return ResponseEntity.status(201).body(commentsCount);
    }
}
