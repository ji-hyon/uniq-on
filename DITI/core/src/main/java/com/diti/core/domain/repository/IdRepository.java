package com.diti.core.domain.repository;


import com.diti.core.domain.entity.Auth;
import com.diti.core.domain.entity.Id;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IdRepository extends JpaRepository<Id, String> {

    Optional<Id> findByWalletAddress(String walletAddress);
}
