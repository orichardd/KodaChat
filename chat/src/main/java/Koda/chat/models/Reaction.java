package Koda.chat.models;

import jakarta.persistence.*;

@Entity
@Table(
        name = "reactions",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "post_id"}),
                @UniqueConstraint(columnNames = {"user_id", "comment_id"})
        }
)
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReactionType type;

    public Reaction(){}

    public Reaction(User user, Post post, Comment comment, ReactionType type) {
        this.user = user;
        this.post = post;
        this.comment = comment;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Post getPost() {
        return post;
    }

    public Comment getComment() {
        return comment;
    }

    public ReactionType getType() {
        return type;
    }

    public void setType(ReactionType type) {
        this.type = type;
    }
}