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

}
