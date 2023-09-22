package ssafy.uniqon.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.PostsController;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.repository.PostRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostReadService {
    private final PostRepository postRepository;

    public List<PostsController.postListsWebResponse> getPostAll(){
        List<PostsController.postListsWebResponse> list = new ArrayList<>();
        for(Posts post: postRepository.getPostAll()){
            list.add(new PostsController.postListsWebResponse(
                    post.getPrice(),
                    post.getTitle(),
                    post.getNft().getMiddle().getSpecies(),
                    null,
                    post.getNft().getImage()
            ));
        }
        return list;
    }

    public PostsController.postDetailWebResponse getPostDetail(int postId, String walletAddress){
        Posts post = postRepository.getPostById(postId);
        if(post==null) {
            throw new IllegalArgumentException("No Post found with postId " + postId);
        }


        return new PostsController.postDetailWebResponse(
                null,
                null,
                post.getNft().getMiddle().getSpecies(),
                post.getNft().getName(),
                post.getNft().getFeature(),
                post.getNft().getAge(),
                post.getNft().getImage(),
                post.getPrice(),
                post.getContent(),
                post.getCreate_datetime(),
                post.getTitle(),
                null
        );
    }


}
