package com.diti.core.domain.entity;


import jakarta.persistence.*;
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
public class Id {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @JoinColumn(name = "wallet_address")
    private String walletAddress;

    private String vcJwt;

    @CreatedDate
    private Timestamp createDateTime;

    @LastModifiedDate
    private Timestamp modifyDateTime;
}
