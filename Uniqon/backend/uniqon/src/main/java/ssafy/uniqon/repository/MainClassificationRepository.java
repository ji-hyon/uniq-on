package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import .uniqon.controller.CollectionsController;
import ssafy.uniqon.model.MainClassifications;


public interface MainClassificationRepository extends JpaRepository<MainClassifications, Integer> {

}
