package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.uniqon.model.Members;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Members, String> {
}
