package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
            Integer nftId,
            String nftName,
            String nftImage
    ){
        public TransactionHistoryWebResponse(String seller, String buyer, String txHash, Timestamp transactedAt, Integer nftId, String nftName, String nftImage) {
            this.seller = seller;
            this.buyer = buyer;
            this.txHash = txHash;
            this.transactedAt = transactedAt;
            this.nftId = nftId;
            this.nftName = nftName;
            this.nftImage = nftImage;
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

    @GetMapping("/info")
    Response<?> myProfile(@AuthenticationPrincipal UserDetails userDetails){

        log.warn("유저 정보 : {}", userDetails.getUsername());
        return OK(memberService.getUserInfo(userDetails.getUsername()));
    }

    @PutMapping("/info")
    Response<?> modifyMyProfile(@RequestBody ModifyMyProfileWebRequest req){
        return OK(null);
    }

    @GetMapping("/boughtList")
    Response<?> getPurchaseList(
                                @PageableDefault Pageable pageable, @AuthenticationPrincipal UserDetails userDetails){

        log.warn("내 구매 리스트 유저 정보 : {}", userDetails.getUsername());
        return OK(myPageService.getBoughtList(userDetails.getUsername(),pageable));
    }

    @GetMapping("/soldList")
    Response<?> getSalesList(
                             @PageableDefault Pageable pageable, @AuthenticationPrincipal UserDetails userDetails){

        log.warn("내 판매 리스트 유저 정보 : {}", userDetails.getUsername());
        return OK(myPageService.getSoldList(userDetails.getUsername(),pageable));
    }

    @GetMapping("/mynfts")
    Response<?> getMyNFTList(
                             @PageableDefault Pageable pageable, @AuthenticationPrincipal UserDetails userDetails){

        log.warn("내 nft 리스트 유저 정보 : {}", userDetails.getUsername());
        return OK(nftService.getMyNFTList(userDetails.getUsername(),pageable));
    }

    @GetMapping("/like-nft-list")
    Response<?> getLikedNFTList(
                                @PageableDefault Pageable pageable, @AuthenticationPrincipal UserDetails userDetails){
        log.warn("내가 좋아요 한 nft 리스트 유저 정보 : {}", userDetails.getUsername());
        return OK(myPageService.getLikedNFTList(userDetails.getUsername(),pageable));
    }

}
