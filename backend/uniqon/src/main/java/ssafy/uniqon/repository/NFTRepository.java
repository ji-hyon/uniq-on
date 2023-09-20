package ssafy.uniqon.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ssafy.uniqon.controller.NFTsController;
import ssafy.uniqon.model.NFTs;

import java.util.ArrayList;

@Repository
@RequiredArgsConstructor
public class NFTRepository {

    @PersistenceContext
    private final EntityManager em;

    @Transactional
    public void createNFT(NFTsController.RegisterNFTWebRequest req, String owner, String txHash,String imageIpfsHash,String jsonIpfsHash,String contractAddress,int tokenId){

        NFTs nft=new NFTs(null,
                owner,
                txHash,
                imageIpfsHash,
                req.name(),
                req.age(),
                req.feature(),
                null,
                null,
                new ArrayList<>(),
                jsonIpfsHash,
                contractAddress,
                tokenId);

        em.persist(nft);
    }


}
