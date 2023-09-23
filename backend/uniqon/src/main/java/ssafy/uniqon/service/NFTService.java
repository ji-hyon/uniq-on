package ssafy.uniqon.service;

import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface NFTService {

    void transactNFT(Integer nftId,String buyer,Integer postId) throws Exception;
}
