package com.diti.core.domain.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.diti.core.domain.entity.QVc.vc;

@Repository
@RequiredArgsConstructor
@Slf4j
public class VcQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public record getVcListDBResponse(
            String id,
            String walletAddress,
            String vcJwt,
            String createDateTime,
            String modifyDateTime,
            String type

    ){}

    public Page<getVcListDBResponse> getVcList(String walletAddress, Pageable pageable){

        List<getVcListDBResponse> list = jpaQueryFactory
                .select(Projections.constructor(getVcListDBResponse.class,
                        vc.id,
                        vc.walletAddress,
                        vc.vcJwt,
                        vc.createDateTime,
                        vc.modifyDateTime,
                        vc.type))
                .from(vc)
                .where(
                        vc.walletAddress.eq(walletAddress)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(vc.id.desc())
                .fetch();

        int count = jpaQueryFactory
                .select(vc.count())
                .from(vc)
                .where(vc.walletAddress.eq(walletAddress))
                .fetch().size();

        return new PageImpl<>(list, pageable, count);
    }
}
