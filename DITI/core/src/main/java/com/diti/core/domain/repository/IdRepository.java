package com.diti.core.domain.repository;


import com.diti.core.domain.entity.Vc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IdRepository extends JpaRepository<Vc, String> {

    Optional<Vc> findByWalletAddress(String walletAddress);
}
