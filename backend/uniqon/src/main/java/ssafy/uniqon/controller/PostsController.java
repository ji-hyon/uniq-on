package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.service.PostCreateService;
import ssafy.uniqon.service.PostReadService;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sales")
@Tag(name = "판매 API")
@CrossOrigin("*")
public class PostsController {

    public record RegisterPostWebRequest(
            Integer price,
            String content,
            String title,
            Integer nftId
    ) {
    }

    public record postListsWebResponse(
            Integer price,
            String title,
            String species,
            String nickname,
            String image
    )
    {}
private final PostReadService postReadService;
private final PostCreateService postCreateService;
    @Operation(summary="판매글 등록", description = "판매글을 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @PostMapping("/register")
    public Response<?> registerPost(@RequestBody RegisterPostWebRequest req) {
        log.debug("# 판매글 등록시 데이터 : {}", req);
        postCreateService.createPost(req);
        return OK("success");
    }

    @PutMapping("/update/{postId}")
    public Response<?> updatePost(@PathVariable int postId, Map<String, Integer> price){
        return OK(null);
    }

    @DeleteMapping("/delete/{postId}")
    public Response<?> deletePost(@PathVariable int postId){
        return OK(null);
    }

    @GetMapping("/search/{word}")
    public Response<?> searchPost(@PathVariable String word) {
        return OK(null);
    }

    @GetMapping("/detail/{postId}")
    public Response<?> getDetailPost(@PathVariable int postId){
        return OK(null);
    }

    @Operation(summary="판매글 조회", description = "판매글 리스트를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/post")
    public Response<?> getAllPostList(@PageableDefault(size=10) Pageable pageable){
        log.debug("# 판매글 리스트 표시");
        List<postListsWebResponse> postlist = postReadService.getPostAll();
        return OK(postlist);
    }
}
