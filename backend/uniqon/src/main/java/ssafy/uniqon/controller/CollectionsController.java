package ssafy.uniqon.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/collections")
public class CollectionsController {


    @PostMapping("/register")
    public Response<?> registerCollections(){
        log.debug("# 도감에 추가할 nft 식별자");
        return OK(null);
    }


    @GetMapping("/mainClassifications")
    public Response<?> getMainClassifications(){
        log.debug("# 대분류 표시");
        return OK(null);
    }

    @GetMapping("/middleClassifications")
    public Response<?> getMiddleClassifications(){
        log.debug("# 중분류 표시");
        return OK(null);
    }

    @GetMapping("/nftList/{middleId}")
    public Response<?> getNftList(@PathVariable Integer middleId){
        log.debug("# 중분류에 해당하는 nft 리스트 : {}", middleId);
        return OK(null);
    }

    @GetMapping("/info/{id}")
    public Response<?> getNftInfo(@PathVariable Integer id){
        log.debug("# NFT 상세 정보 : {}", id);
        return OK(null);
    }

    @GetMapping("/search")
    public Response<?> searchColloections(@RequestParam("query") String query){
        log.debug("# 도감 검색 내용 : {}", query);
        return OK(null);
    }

    @PutMapping("/info/{id}")
    public Response<?> modifyNftInfo(@PathVariable Integer id){
        log.debug("# 도감 NFT 내용 수정할 nft 식별자 : {}", id);
        return OK(null);
    }

    @DeleteMapping("/{id}")
    public Response<?> deleteNft(@PathVariable Integer id){
        log.debug("# 도감에서 삭제할 nft 식별자 : {}", id);
        return OK(null);
    }



}
