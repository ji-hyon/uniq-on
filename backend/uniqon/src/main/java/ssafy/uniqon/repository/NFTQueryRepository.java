package ssafy.uniqon.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.controller.CollectionsController;

import java.util.List;

import static ssafy.uniqon.model.QNFTs.nFTs;

@Repository
@RequiredArgsConstructor
@Slf4j
public class NFTQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<CollectionsController.nftListWebResponse> getNftList(int middleClassificationId, Pageable pageable){
        log.debug("# DB에서 nft 리스트 조회 ..");

        List<CollectionsController.nftListWebResponse> list = jpaQueryFactory
                .select(Projections.constructor(CollectionsController.nftListWebResponse.class,
                        nFTs.id,
                        nFTs.nftTxHash,
                        nFTs.image,
                        nFTs.name,
                        nFTs.age,
                        nFTs.feature,
                        nFTs.owner.id,
                        nFTs.middle.id,
                        nFTs.middle.species,
                        nFTs.nftURL,
                        nFTs.contractAddress,
                        nFTs.tokenId
                        ))
                .from(nFTs)
                .where(
                        nFTs.middle.id.eq(middleClassificationId)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(nFTs.id.desc())
                .fetch();

        int count = jpaQueryFactory
                .select(nFTs.count())
                .from(nFTs)
                .where(nFTs.middle.id.eq(middleClassificationId))
                .fetch().size();


        return new PageImpl<>(list, pageable, count);
    }

}
