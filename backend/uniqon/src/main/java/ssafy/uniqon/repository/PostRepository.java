package ssafy.uniqon.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.model.QPosts;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostRepository {

    @PersistenceContext
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    private final QPosts posts = QPosts.posts;

    public List<Posts> getPostAll() { return jpaQueryFactory.selectFrom(posts).where(posts.state.eq(0)).fetch();}

}
