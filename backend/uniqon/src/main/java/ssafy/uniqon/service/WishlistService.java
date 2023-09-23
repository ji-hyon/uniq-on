package ssafy.uniqon.service;

import ssafy.uniqon.controller.WishlistController;

public interface WishlistService {

    void addWishlist (WishlistController.addWishlistWebRequest req);
    void deleteWishlist (int wishlistId);
}
