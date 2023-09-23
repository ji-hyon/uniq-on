package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.model.TransactionHistories;

@Repository
public interface TransactionHistoriesRepository extends JpaRepository<TransactionHistories, Integer> {
}
