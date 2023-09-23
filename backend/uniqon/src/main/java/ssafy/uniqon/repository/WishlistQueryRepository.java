package ssafy.uniqon.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static ssafy.uniqon.model.QMiddleClassifications.middleClassifications;
import static ssafy.uniqon.model.QNFTs.nFTs;
import static ssafy.uniqon.model.QPosts.posts;
import static ssafy.uniqon.model.QWishList.wishList;

@Repository
@RequiredArgsConstructor
@Slf4j
public class WishlistQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public record getWishlistDBResponse(
            int wishlistId,
            String nftImage,
            String sellerWalletAddress,
            String sellerProfileImage,
            String sellerNickname,
            int price,
//            Integer nftMiddleId,
//            String nftMiddleSpecies,
            String postTitle
    ){
        public getWishlistDBResponse(int wishlistId, String nftImage, String sellerWalletAddress, String sellerProfileImage, String sellerNickname, int price, String postTitle) {
            this.wishlistId = wishlistId;
            this.nftImage = nftImage;
            this.sellerWalletAddress = sellerWalletAddress;
            this.sellerProfileImage = sellerProfileImage;
            this.sellerNickname = sellerNickname;
            this.price = price;
            this.postTitle = postTitle;
        }
    }

    public Page<getWishlistDBResponse> getWishList (Pageable pageable, String walletAddress) {

        List<getWishlistDBResponse> list = jpaQueryFactory
                .select(Projections.constructor(getWishlistDBResponse.class,
                        wishList.id,
                        wishList.post.nft.image,
                        wishList.post.seller.walletAddress,
                        wishList.post.seller.profileImage,
                        wishList.post.seller.nickname,
                        wishList.post.price,
//                        wishList.post.nft.middle.id,
//                        wishList.post.nft.middle.species,
                        wishList.post.title
                        ))
                .from(wishList)
//                .leftJoin(middleClassifications).on(wishList.post.id.eq(posts.id))
                .where(wishList.member.walletAddress.eq(walletAddress))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(wishList.id.desc())
                .fetch();

        int count = jpaQueryFactory
                .select(wishList.count())
                .from(wishList)
                .where(wishList.member.walletAddress.eq(walletAddress))
                .fetch().size();

        return new PageImpl<>(list, pageable, count);
    }


}
