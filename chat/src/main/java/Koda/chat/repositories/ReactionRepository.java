package Koda.chat.repositories;

import Koda.chat.models.Comment;
import Koda.chat.models.Post;
import Koda.chat.models.Reaction;
import Koda.chat.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    Optional<Reaction> findByUserAndPost(User user, Post post);

    Optional<Reaction> findByUserAndComment(User user, Comment comment);

    @Query("SELECT COUNT(r) FROM Reaction r WHERE r.post.id = :postId AND r.type = 'LIKE'")
    Integer getLikesByPost(@Param("postId") Long postId);

    @Query("SELECT COUNT(r) FROM Reaction r WHERE r.post.id = :postId AND r.type = 'DISLIKE'")
    Integer getDislikesByPost(@Param("postId") Long postId);

    @Query("SELECT COUNT(r) FROM Reaction r WHERE r.comment.id = :commentId AND r.type = 'LIKE'")
    Integer getLikesByComment(@Param("commentId") Long commentId);

    @Query("SELECT COUNT(r) FROM Reaction r WHERE r.comment.id = :commentId AND r.type = 'DISLIKE'")
    Integer getDislikesByComment(@Param("commentId") Long commentId);

    Optional<Reaction> findReactionByUserAndPost(User user, Post post);
}