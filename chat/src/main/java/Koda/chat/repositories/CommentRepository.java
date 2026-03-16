package Koda.chat.repositories;

import Koda.chat.DTOs.CommentDTO;
import Koda.chat.models.Comment;
import Koda.chat.models.Post;
import aj.org.objectweb.asm.commons.Remapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> getCommentsByPost(Post post);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.post.id = :postId")
    Integer countByPostId(@Param("postId") Long postId);

    Remapper findByPost(Post post);
}
