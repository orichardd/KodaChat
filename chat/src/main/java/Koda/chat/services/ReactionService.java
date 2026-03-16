package Koda.chat.services;

import Koda.chat.DTOs.ReactionDTO;
import Koda.chat.models.*;
import Koda.chat.repositories.CommentRepository;
import Koda.chat.repositories.PostRepository;
import Koda.chat.repositories.ReactionRepository;
import Koda.chat.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReactionService {

    @Autowired
    private ReactionRepository reactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    public void reactPost(Long postId, ReactionType reactionType){

        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();
        if(auth == null){
            throw new RuntimeException("Usuário não autentificado");
        }
        String username = auth.getName();

        User user = userRepository.findUserByUsername(username);
        Post post = postRepository.findPostById(postId);

        if(post == null || user == null){
            throw new RuntimeException("Post ou usuario nao encontrado.");
        }

        Optional<Reaction> existingReaction =
                reactionRepository.findReactionByUserAndPost(user, post);

        if(existingReaction.isPresent()){

            Reaction reaction = existingReaction.get();

            if(reaction.getType() == reactionType){
                reactionRepository.delete(reaction);
            }
            else{
                reaction.setType(reactionType);
                reactionRepository.save(reaction);
            }

        } else {

            Reaction newReaction = new Reaction(
                    user,
                    post,
                    null,
                    reactionType
            );

            reactionRepository.save(newReaction);
        }
    }

    @Transactional
    public void reactComment(Long commentId, ReactionType reactionType){

        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();
        if(auth == null){
            throw new RuntimeException("Usuário não autentificado");
        }
        String username = auth.getName();

        User user = userRepository.findUserByUsername(username);
        if(user == null){
            throw new RuntimeException("Usuario nao encontrado");
        }

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        Optional<Reaction> existing =
                reactionRepository.findByUserAndComment(user, comment);

        if(existing.isPresent()){

            Reaction reaction = existing.get();

            if(reaction.getType() == reactionType){
                reactionRepository.delete(reaction);
            }else{
                reaction.setType(reactionType);
                reactionRepository.save(reaction);
            }

        } else {

            Reaction reaction = new Reaction(user, null, comment, reactionType);
            reactionRepository.save(reaction);

        }
    }

    public ReactionDTO GetLikesAndDislikesByPost(Long postId) {
        Integer likes = reactionRepository.getLikesByPost(postId);
        Integer dislikes = reactionRepository.getDislikesByPost(postId);

        if(likes == null){ likes = 0; }
        if(dislikes == null){ dislikes = 0;}

        return new ReactionDTO(
                likes,
                dislikes
        );
    }

    public ReactionDTO GetLikesAndDislikesByComment(Long commentId) {
        Integer likes = reactionRepository.getLikesByComment(commentId);
        Integer dislikes = reactionRepository.getDislikesByComment(commentId);

        if(likes == null){ likes = 0; }
        if(dislikes == null){ dislikes = 0;}

        return new ReactionDTO(
                likes,
                dislikes
        );
    }
}
