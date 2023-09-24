package ssafy.uniqon.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ssafy.uniqon.controller.MyPageController;
import ssafy.uniqon.model.TransactionHistories;

public interface MyPageService {


    Page<TransactionHistories> getBoughtList(String buyer, Pageable pageable);

    Page<TransactionHistories> getSoldList(String seller,Pageable pageable);
}
