package com.diti.core.domain.service;

import com.diti.core.domain.controller.VcController;
import com.diti.core.domain.entity.Vc;
import com.diti.core.domain.repository.VcRepository;
import com.diti.core.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class VcServiceImpl implements VcService{

    private final VcRepository vcRepository;
    @Override
    public void login(String walletAddress) {

    }

    @Override
    public getVcWebResponse getVc(VcController.getVcWebRequest req) {
        Vc vc = vcRepository.findByWalletAddressAndType(req.walletAddress(), req.type()).orElseThrow(
                ()-> new NotFoundException(Vc.class, req.walletAddress(), req.type())
        );

        getVcWebResponse res = new getVcWebResponse(vc.getId(), vc.getWalletAddress(), vc.getType(), vc.getVcJwt(), vc.getCreateDateTime(), vc.getModifyDateTime());

        return res;
    }
}
