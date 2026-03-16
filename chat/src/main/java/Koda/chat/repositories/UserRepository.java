package Koda.chat.repositories;

import Koda.chat.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsUserByUsername(String username);

    User findUserByUsername(String username);

    User getUserByUsername(String username);

    Optional<Object> findByUsername(String username);
}
