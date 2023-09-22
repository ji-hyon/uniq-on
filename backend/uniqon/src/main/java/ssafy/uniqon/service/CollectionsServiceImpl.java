package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.uniqon.controller.CollectionsController;
import ssafy.uniqon.repository.MainClassficationQueryRepository;
import ssafy.uniqon.repository.MainClassificationRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class CollectionsServiceImpl implements CollectionsService{

    private final MainClassficationQueryRepository mainClassficationQueryRepository;


    @Override
    public Page<MainClassficationQueryRepository.getMainClassficationDBResponse> getMainClassificationList(Pageable pageable) {
        log.debug("# 대분류 리스트...");
        return mainClassficationQueryRepository.getMainClassificationList(pageable);
    }
}
