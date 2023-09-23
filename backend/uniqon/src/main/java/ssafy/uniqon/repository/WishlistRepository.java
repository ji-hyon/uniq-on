package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.uniqon.model.WishList;

public interface WishlistRepository extends JpaRepository<WishList, Integer> {
}
