package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.uniqon.controller.WishlistController;
import ssafy.uniqon.global.exception.NotFoundException;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.model.WishList;
import ssafy.uniqon.repository.MemberRepository;
import ssafy.uniqon.repository.PostsRepository;
import ssafy.uniqon.repository.WishlistRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService{

    private final PostsRepository postsRepository;
    private final WishlistRepository wishlistRepository;
    private final MemberRepository memberRepository;

    @Override
    public void addWishlist(WishlistController.addWishlistWebRequest req) {
        Posts posts = postsRepository.findById(req.postId());
        Members members = memberRepository.findById(req.memberId()).orElseThrow(() -> new NotFoundException(Members.class, req.memberId()));
        if (posts != null) {
            log.debug("# 위시리스트 추가중 ...");
            wishlistRepository.save(WishList.builder()
                    .member(members)
                    .post(posts)
                    .build());
        } else {
            log.debug("# 해당 포스트는 존재하지 않습니다 : {}", req.postId());
        }
    }

    @Override
    public void deleteWishlist(int wishlistId) {
        WishList wishList = wishlistRepository.findById(wishlistId).orElseThrow(() -> new NotFoundException(WishList.class, wishlistId));
        if (wishList != null) {
            log.debug("# 위시리스트 삭제중..");
            wishlistRepository.delete(wishList);
        }
    }
}
