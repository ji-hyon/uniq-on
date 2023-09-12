package ssafy.uniqon.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
public class WishlistController {

    @PostMapping("/{postId}")
    public Response<?> addWishlist(@PathVariable Integer postId){
        log.info("# 위시리스트에 추가할 포스트 식별자 : {}", postId);
        return OK(null);
    }

    @GetMapping("/{walletAddress}")
    public Response<?> getWishlist(@PathVariable String walletAddress){
        log.info("# 위시리스트 조회할 지갑 주소 : {}", walletAddress);
        return OK(null);
    }

    @DeleteMapping("/{wishlistId}")
    public Response<?> deleteWishlist(@PathVariable Integer wishlistId){
        log.info("# 삭제할 위시리스트 식별자 : {}", wishlistId);
        return OK(null);
    }
}
