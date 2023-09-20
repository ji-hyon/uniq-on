package com.diti.core.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class VerifiableCredential {

    @Id
    private String walletAddress; // 기본 키

    private String vcToken;

    @CreatedDate
    private Timestamp createDateTime;

    @LastModifiedDate
    private Timestamp modifyDateTime;

}

