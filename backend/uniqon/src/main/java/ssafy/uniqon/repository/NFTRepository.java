package ssafy.uniqon.repository;

import com.querydsl.core.types.EntityPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ssafy.uniqon.controller.NFTsController;
import ssafy.uniqon.model.NFTs;
import ssafy.uniqon.model.QMembers;
import ssafy.uniqon.model.QNFTs;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class NFTRepository {

    @PersistenceContext
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    private final QNFTs nfts=QNFTs.nFTs;

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

    public List<NFTs> getNFTAll(){
        return jpaQueryFactory.selectFrom(nfts).fetch();
    }

    public NFTs getNFTById(int nftId){
        return jpaQueryFactory.selectFrom(nfts).where(nfts.id.eq(nftId)).fetchOne();
    }

}
