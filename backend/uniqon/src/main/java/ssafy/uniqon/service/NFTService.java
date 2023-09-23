package ssafy.uniqon.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ssafy.uniqon.controller.NFTsController;

import java.io.IOException;


public interface NFTService {

    void transactNFT(Integer nftId,String buyer,Integer postId) throws Exception;
    public void createNFT(NFTsController.RegisterNFTWebRequest req, MultipartFile multipartFile,String userId) throws Exception;
}
