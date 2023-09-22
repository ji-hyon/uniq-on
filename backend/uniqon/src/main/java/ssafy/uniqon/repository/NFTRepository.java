package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.uniqon.model.NFTs;

public interface NFTRepository extends JpaRepository<NFTs, Integer> {
}
