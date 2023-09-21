package com.diti.core.domain.repository;

import com.diti.core.domain.controller.VcController;
import com.diti.core.domain.entity.Vc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VcRepository extends JpaRepository<Vc, Integer> {

    Optional<Vc> findByWalletAddressAndType(String walletAddress, String type);
}
