package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.service.MyPageService;

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
            Timestamp transactedAt
    ){}

    private final MyPageService myPageService;

    @GetMapping("/info/{userId}")
    Response<?> myProfile(@PathVariable int userId){
        return OK(null);
    }

    @PutMapping("/info")
    Response<?> modifyMyProfile(@RequestBody ModifyMyProfileWebRequest req){
        return OK(null);
    }

    @PostMapping("/nft/{myCollectionId}")
    Response<?> likeNFT(@PathVariable int myCollectionId){
        return OK(null);
    }

    @DeleteMapping("/nft/{myCollectionId}")
    Response<?> undoLikeNFT(@PathVariable int myCollectionId){
        return OK(null);
    }

    @GetMapping("/nft")
    Response<?> getLikeNFTList(){
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

}
