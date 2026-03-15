package Koda.chat.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Integer picture_num;

    @Column
    private LocalDateTime date;

    public User(String username, String password, Integer picture_num) {
        this.username = username;
        this.password = password;
        this.picture_num = picture_num;
        this.date = LocalDateTime.now();
    }

    public User() {
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Integer getPicture_num() {
        return picture_num;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDate() {
        return date;
    }
}
