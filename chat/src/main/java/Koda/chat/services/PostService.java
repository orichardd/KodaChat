package Koda.chat.services;

import Koda.chat.DTOs.PostDTO;
import Koda.chat.DTOs.create.CreatePostDTO;
import Koda.chat.models.Post;
import Koda.chat.models.User;
import Koda.chat.repositories.PostRepository;
import Koda.chat.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Post CreatePost(CreatePostDTO dto) {

        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String username = auth.getName();

        User user = userRepository.findUserByUsername(username);

        if (user == null) {
            throw new IllegalArgumentException("Usuario não encontrado");
        }

        System.out.println(dto.content());
        System.out.println(dto.content().length());

        Post post = new Post(
                dto.title(),
                dto.content(),
                user
        );

        return postRepository.save(post);
    }

    public List<PostDTO> GetAllPosts() {
        return postRepository.findAll().stream()
                .map(p ->
                        new PostDTO(
                                p.getId(),
                                p.getTitle(),
                                p.getContent(),
                                p.getDate(),
                                p.getUser().getUsername()

                        )).toList();
    }
}
