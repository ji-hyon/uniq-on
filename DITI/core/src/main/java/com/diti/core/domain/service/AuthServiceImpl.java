package com.diti.core.domain.service;

import com.diti.core.domain.entity.Auth;
import com.diti.core.domain.repository.AuthRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final AuthRepository authRepository;

    @Override
    public void registerAuth(String walletAddress) {
        Auth auth = authRepository.findByWalletAddress(walletAddress);
        if (auth == null) {
            authRepository.save(Auth.builder()
                    .walletAddress(walletAddress)
                    .build());
        }
    }
}
