package Koda.chat.services;

import Koda.chat.DTOs.CommentDTO;
import Koda.chat.DTOs.create.CreateCommentDTO;
import Koda.chat.models.Comment;
import Koda.chat.models.Post;
import Koda.chat.models.User;
import Koda.chat.repositories.CommentRepository;
import Koda.chat.repositories.PostRepository;
import Koda.chat.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    public void CreateComment(Long postId, CreateCommentDTO dto) {
        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();
        if(auth == null){
            throw new RuntimeException("Usuário não autentificado");
        }
        String username = auth.getName();
        User user = userRepository.findUserByUsername(username);
        //nunca é pra chegar nessa verificação mas vai que né
        if(user == null){
            throw new RuntimeException("Usuario não encontrado");
        }

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post não encontrado"));

        Comment comment = new Comment(
            dto.content(),
                user,
                post
        );

        commentRepository.save(comment);
    }

    public List<CommentDTO> GetAllCommentsByPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post não encontrado"));

        return commentRepository.getCommentsByPost(post).stream()
                .map(
                        c -> new CommentDTO(
                                c.getContent(),
                                c.getDate(),
                                c.getUser().getUsername(),
                                c.getId()
                        )
                )
                .toList();
    }

    public Integer GetCommentsCountByPostId(Long postId) {
        return commentRepository.countByPostId(postId);
    }
}
