package com.diti.core.domain.repository;


import com.diti.core.domain.dto.response.VcListDBResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

import static com.diti.core.domain.entity.QAuth.auth;
import static com.diti.core.domain.entity.QVc.vc;

@Repository
@RequiredArgsConstructor
@Slf4j
public class VcQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;



    public Page<VcListDBResponse> getVcList(String walletAddress, Pageable pageable){

        List<VcListDBResponse> list = jpaQueryFactory
                .select(Projections.fields(VcListDBResponse.class,
                        vc.id,
                        auth.walletAddress,
                        vc.vcJwt,
                        vc.createDateTime,
                        vc.modifyDateTime,
                        vc.type))
                .from(vc)
                .where(
                        vc.auth.walletAddress.eq(walletAddress)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(vc.id.desc())
                .fetch();

        int count = jpaQueryFactory
                .select(vc.count())
                .from(vc)
                .where(auth.walletAddress.eq(walletAddress))
                .fetch().size();

        return new PageImpl<>(list, pageable, count);
    }
}
