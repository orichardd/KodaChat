package Koda.chat.repositories;

import Koda.chat.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsUserByUsername(String username);

    User findUserByUsername(String username);

    User getUserByUsername(String username);
}
