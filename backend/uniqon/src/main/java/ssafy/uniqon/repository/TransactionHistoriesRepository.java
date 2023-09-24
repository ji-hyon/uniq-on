package ssafy.uniqon.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.TransactionHistories;

import java.util.List;

@Repository
public interface TransactionHistoriesRepository extends JpaRepository<TransactionHistories, Integer> {
    Page<TransactionHistories> findByBuyerOrderByTransactedAtDesc(Members buyer,Pageable pageable);

    Page<TransactionHistories> findBySellerOrderByTransactedAtDesc(Members seller, Pageable pageable);

}
