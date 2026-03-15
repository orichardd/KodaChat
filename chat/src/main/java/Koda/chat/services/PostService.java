package Koda.chat.services;

import Koda.chat.DTOs.PostDTO;
import Koda.chat.DTOs.create.CreatePostDTO;
import Koda.chat.models.Post;
import Koda.chat.models.User;
import Koda.chat.repositories.PostRepository;
import Koda.chat.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

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
                                p.getUser().getUsername(),
                                p.getUser().getPicture_num()
                        )).toList();
    }

    public List<PostDTO> GetPostsByUser(String username) {
        User user = userRepository.findUserByUsername(username);
        if(user ==null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
        }

        return postRepository.findPostByUser(user)
                .stream()
                .map(p -> new PostDTO(
                        p.getId(),
                        p.getTitle(),
                        p.getContent(),
                        p.getDate(),
                        username,
                        user.getPicture_num()
                        ))
                .toList();
    }

    public PostDTO GetPostsById(Long postId) {
        Optional<Post> post = postRepository.findById(postId);
        if(post.isEmpty()){
            throw new RuntimeException("Post não encontrado");
        }
        return new PostDTO(
                post.get().getId(),
                post.get().getTitle(),
                post.get().getContent(),
                post.get().getDate(),
                post.get().getUser().getUsername(),
                post.get().getUser().getPicture_num()
        );
    }
}
