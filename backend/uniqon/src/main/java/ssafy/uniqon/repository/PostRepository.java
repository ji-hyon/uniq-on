package ssafy.uniqon.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ssafy.uniqon.controller.PostsController;
import ssafy.uniqon.model.NFTs;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.model.QPosts;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostRepository {

    @PersistenceContext
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    private final QPosts posts = QPosts.posts;

    @Transactional
    public void createPost(PostsController.RegisterPostWebRequest req){
        NFTs nft = em.find(NFTs.class, req.nftId());
        if (nft == null) {
            throw new IllegalArgumentException("No NFT found with id " + req.nftId());
        }

            Posts post = new Posts(
                    null,
                    req.price(),
                    req.content(),
                    null,
                    null,
                    req.title(),
                    null,
                    0,
                    null,
                    null,
                    nft
            );

        em.persist(post);
    }

    public List<Posts> getPostAll() { return jpaQueryFactory.selectFrom(posts).where(posts.state.eq(0)).fetch();}

}
