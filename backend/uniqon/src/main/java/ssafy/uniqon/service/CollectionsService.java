package ssafy.uniqon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ssafy.uniqon.controller.CollectionsController;
import ssafy.uniqon.repository.MainClassficationQueryRepository;

public interface CollectionsService {

    Page<MainClassficationQueryRepository.getMainClassficationDBResponse> getMainClassificationList(Pageable pageable);

    CollectionsController.middleAnimalInfoWebResponse getmiddleAnimalInfo(int middleClassificationId);
}
