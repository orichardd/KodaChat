package Koda.chat.controllers;

import Koda.chat.DTOs.ReactionDTO;
import Koda.chat.models.ReactionType;
import Koda.chat.services.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reaction")
public class ReactionController {

    @Autowired
    private ReactionService reactionService;

    @PostMapping("/post/{postId}")
    public ResponseEntity<?> ReactToAPost(@PathVariable Long postId, @RequestHeader ReactionType reactionType){
        reactionService.reactPost(postId, reactionType);
        return ResponseEntity.ok().body("Curtida enviada com sucesso");
    }

    @PostMapping("/comment/{commentId}")
    public ResponseEntity<?> ReactToAComment(@PathVariable Long commentId, @RequestHeader ReactionType reactionType){
        reactionService.reactComment(commentId, reactionType);
        return ResponseEntity.ok().body("Curtida enviada com sucesso");
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<?> GetReactionByPost(@PathVariable Long postId){
        ReactionDTO dto = reactionService.GetLikesAndDislikesByPost(postId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/comment/{commentId}")
    public ResponseEntity<?> GetReactionByComment(@PathVariable Long commentId){
        ReactionDTO dto = reactionService.GetLikesAndDislikesByComment(commentId);
        return ResponseEntity.ok(dto);
    }
}
