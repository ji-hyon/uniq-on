package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.MyPageController;
import ssafy.uniqon.controller.NFTsController;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.MyCollections;
import ssafy.uniqon.model.NFTs;
import ssafy.uniqon.model.TransactionHistories;
import ssafy.uniqon.repository.MemberRepository;
import ssafy.uniqon.repository.MyCollectionsQueryRepository;
import ssafy.uniqon.repository.MyCollectionsRepository;
import ssafy.uniqon.repository.TransactionHistoriesRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

    private final TransactionHistoriesRepository transactionHistoriesRepository;
    private final MemberRepository memberRepository;
    private final MyCollectionsQueryRepository myCollectionsRepository;
    @Override
    public Page<TransactionHistories> getBoughtList(String buyer,Pageable pageable) {
        Members member=memberRepository.findById(buyer).get();
        Page<TransactionHistories> txHistories = transactionHistoriesRepository.findByBuyerOrderByTransactedAtDesc(member,pageable);
        return txHistories;
    }

    @Override
    public Page<TransactionHistories> getSoldList(String seller,Pageable pageable) {
        Members member=memberRepository.findById(seller).get();
        Page<TransactionHistories> txHistories = transactionHistoriesRepository.findByBuyerOrderByTransactedAtDesc(member,pageable);
        return txHistories;
    }

    @Override
    public Page<NFTsController.NFTWebResponse> getLikedNFTList(String userId, Pageable pageable) {
        return myCollectionsRepository.getMyCollectionList(userId,pageable);
    }
}
