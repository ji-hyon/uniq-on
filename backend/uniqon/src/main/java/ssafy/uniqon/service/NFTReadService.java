package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
//import ssafy.uniqon.controller.NFTsController;
import ssafy.uniqon.model.NFTs;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NFTReadService {
//    private final NFTRepository nftRepository;
//
//    public List<NFTsController.NFTWebResponse> getNFTAll(){
//        List<NFTsController.NFTWebResponse> list=new ArrayList<>();
//        for(NFTs nft: nftRepository.getNFTAll()){
//            list.add(new NFTsController.NFTWebResponse(
//                    nft.getId(),
//                    nft.getOwner(),
//                    nft.getImage(),
//                    nft.getName(),
//                    nft.getAge(),
//                    nft.getFeature(),
//                    nft.getNftURL(),
//                    nft.getContractAddress(),
//                    nft.getTokenId()
//            ));
//        }
//        return list;
//    }
//
//    public NFTsController.NFTWebResponse getNFTById(int nftId){
//        NFTs nft=nftRepository.getNFTById(nftId);
//        return new NFTsController.NFTWebResponse(
//                nft.getId(),
//                nft.getOwner(),
//                nft.getImage(),
//                nft.getName(),
//                nft.getAge(),
//                nft.getFeature(),
//                nft.getNftURL(),
//                nft.getContractAddress(),
//                nft.getTokenId()
//        );
//    }
}
