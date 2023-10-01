package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.PostsController;
import ssafy.uniqon.global.exception.NotFoundException;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.NFTs;
import ssafy.uniqon.repository.MemberRepository;
import ssafy.uniqon.repository.NFTRepository;
import ssafy.uniqon.repository.PostRepository;

@Service
@RequiredArgsConstructor
public class PostCreateService {
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final NFTRepository nftRepository;
    public void createPost(PostsController.RegisterPostWebRequest req, UserDetails user) {
        Members member=memberRepository.findById(user.getUsername()).orElseThrow(()->new NotFoundException(Members.class,user.getUsername()));
        NFTs nft=nftRepository.findByTokenId(req.tokenId()).orElseThrow(()->new NotFoundException(NFTs.class,req.tokenId()));
        postRepository.createPost(req,member,nft);
    }
}
