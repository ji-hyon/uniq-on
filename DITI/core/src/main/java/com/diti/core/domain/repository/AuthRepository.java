package com.diti.core.domain.repository;

import com.diti.core.domain.entity.VerifiableCredential;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository extends JpaRepository<VerifiableCredential, String> {

}
