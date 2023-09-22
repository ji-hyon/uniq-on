package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.uniqon.controller.CollectionsController;
import ssafy.uniqon.model.MiddleClassifications;
import ssafy.uniqon.repository.MainClassficationQueryRepository;
import ssafy.uniqon.repository.MainClassificationRepository;
import ssafy.uniqon.repository.MiddleClassificationQueryRepository;
import ssafy.uniqon.repository.MiddleClassificationRepository;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class CollectionsServiceImpl implements CollectionsService{

    private final MainClassficationQueryRepository mainClassficationQueryRepository;
    private final MainClassificationRepository mainClassificationRepository;
    private final MiddleClassificationRepository middleClassificationRepository;
    private final MiddleClassificationQueryRepository middleClassificationQueryRepository;


    @Override
    public Page<MainClassficationQueryRepository.getMainClassficationDBResponse> getMainClassificationList(Pageable pageable) {
        log.debug("# 대분류 리스트...");
        return mainClassficationQueryRepository.getMainClassificationList(pageable);
    }

    @Override
    public CollectionsController.middleAnimalInfoWebResponse getmiddleAnimalInfo(int middleClassificationId) {
        log.debug("# 중분류 정보 조회...");
        return middleClassificationRepository.findById(middleClassificationId);
    }

    @Override
    public Page<CollectionsController.middleClassificationListWebResponse> getMiddleClassificationList(Pageable pageable, int mainClassificationId) {
        return middleClassificationQueryRepository.getMiddleClassificationList(pageable, mainClassificationId);
    }
}
