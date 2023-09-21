package ssafy.uniqon.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.controller.MemberController;
import ssafy.uniqon.model.MemberRole;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.QMembers;

@Transactional
@RequiredArgsConstructor
@Repository
public class MemberRepository {
    @PersistenceContext
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    private final QMembers members=QMembers.members;

    public void signup(MemberController.SignupWebRequest req){
        Members member=new Members();
        member.setName(req.name());
        member.setRole(MemberRole.USER);
        member.setBirth(req.birth());
        member.setGender(req.gender());
        member.setNickname(req.nickname());
        member.setVpToken(req.vpToken());
    }
}
