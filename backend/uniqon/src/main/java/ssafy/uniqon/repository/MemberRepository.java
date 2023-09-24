package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.NFTs;

public interface MemberRepository extends JpaRepository<Members, String> {
    public NFTs findByNickname(String nickname);
}
