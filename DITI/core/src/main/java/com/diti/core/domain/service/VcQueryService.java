package com.diti.core.domain.service;

import com.diti.core.domain.repository.VcQueryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VcQueryService {

    Page<VcQueryRepository.getVcListDBResponse> getVcList(String walletAddress, Pageable pageable);
}
