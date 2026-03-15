package Koda.chat.repositories;

import Koda.chat.models.Post;
import Koda.chat.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findPostByUser(User user);
}
