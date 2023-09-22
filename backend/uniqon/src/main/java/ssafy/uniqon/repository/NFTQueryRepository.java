package ssafy.uniqon.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.controller.CollectionsController;
import ssafy.uniqon.model.NFTs;
import ssafy.uniqon.model.QNFTs;

import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class NFTQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<CollectionsController.nftListWebResponse> getNftList(){

        List<CollectionsController.nftListWebResponse> list = jpaQueryFactory
                .select(Projections.constructor(CollectionsController.nftListWebResponse.class,
                        NFTs.))
                .from()
                .where()


        return new PageImpl<>();
    }

}
