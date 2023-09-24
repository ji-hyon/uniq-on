package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.MyPageController;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.TransactionHistories;
import ssafy.uniqon.repository.MemberRepository;
import ssafy.uniqon.repository.TransactionHistoriesRepository;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

    private final TransactionHistoriesRepository transactionHistoriesRepository;
    private final MemberRepository memberRepository;
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
}
