package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.service.MemberService;
import ssafy.uniqon.service.MyPageService;
import ssafy.uniqon.service.NFTService;

import java.sql.Timestamp;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/myPage")
@Tag(name = "마이페이지 API")
@CrossOrigin("*")
public class MyPageController {

    record ModifyMyProfileWebRequest(
            String password,
            String nickname,
            String profileImage
    ){}

    public record TransactionHistoryWebResponse(
            String seller,
            String buyer,
            String txHash,
            Timestamp transactedAt,
            Integer nftId
    ){
        public TransactionHistoryWebResponse(String seller, String buyer, String txHash, Timestamp transactedAt,Integer nftId) {
            this.seller = seller;
            this.buyer = buyer;
            this.txHash = txHash;
            this.transactedAt = transactedAt;
            this.nftId=nftId;
        }
    }

    public record MemberInfoWebResponse(
            String walletAddress,
            String name,
            String nickname,
            String birth,
            String gender,
            String vpToken,
            byte[] profileImage
    ){}

    private final MyPageService myPageService;
    private final NFTService nftService;
    private final MemberService memberService;

    @GetMapping("/info/{userId}")
    Response<?> myProfile(@PathVariable String userId){
        return OK(memberService.getUserInfo(userId));
    }

    @PutMapping("/info")
    Response<?> modifyMyProfile(@RequestBody ModifyMyProfileWebRequest req){
        return OK(null);
    }

    @GetMapping("/boughtList/{userId}")
    Response<?> getPurchaseList(@PathVariable String userId,
                                @PageableDefault Pageable pageable){

        return OK(myPageService.getBoughtList(userId,pageable));
    }

    @GetMapping("/soldList/{userId}")
    Response<?> getSalesList(@PathVariable String userId,
                             @PageableDefault Pageable pageable){
        return OK(myPageService.getSoldList(userId,pageable));
    }

    @GetMapping("/mynfts/{userId}")
    Response<?> getMyNFTList(@PathVariable String userId,
                             @PageableDefault Pageable pageable){
        return OK(nftService.getMyNFTList(userId,pageable));
    }

    @GetMapping("/like-nft-list/{userId}")
    Response<?> getLikedNFTList(@PathVariable String userId,
                                @PageableDefault Pageable pageable){
        return OK(myPageService.getLikedNFTList(userId,pageable));
    }

}
