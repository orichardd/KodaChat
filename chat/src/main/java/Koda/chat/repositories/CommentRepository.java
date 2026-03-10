package Koda.chat.repositories;

import Koda.chat.DTOs.CommentDTO;
import Koda.chat.models.Comment;
import Koda.chat.models.Post;
import aj.org.objectweb.asm.commons.Remapper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> getCommentsByPost(Post post);

    Remapper findByPost(Post post);
}
