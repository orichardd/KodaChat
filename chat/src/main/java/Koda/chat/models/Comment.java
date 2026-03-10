package Koda.chat.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    private User user;

    @ManyToOne
    private Post post;

    @Column
    private LocalDateTime date;

    public Comment(String content, User user, Post post) {
        this.content = content;
        this.user = user;
        this.post = post;
        this.date = LocalDateTime.now();
    }

    public Comment() {
    }

    public String getContent() {
        return content;
    }

    public User getUser() {
        return user;
    }

    public Post getPost() {
        return post;
    }

    public String getDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return date.format(formatter);
    }
}
