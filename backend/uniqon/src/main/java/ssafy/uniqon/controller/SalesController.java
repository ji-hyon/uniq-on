package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;

import java.time.LocalDateTime;
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
public class SalesController {

    record RegisterPostWebRequest(
            Integer price,
            String content,
            String title,
            String species,
            String creatureName
    ) {
    }

    record postListsWebResponse(
            Integer price,
            String title,
            String species,
            String nickname,
            String image
    )
    {}


    @PostMapping("/register")
    public Response<?> registerPost(@RequestBody RegisterPostWebRequest req){
        return OK(null);
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
        List<postListsWebResponse> postlist = new ArrayList<>();
        postListsWebResponse res = new postListsWebResponse(1, "도마뱀1","lizard","도상제","https://gateway.pinata.cloud/ipfs/QmWorfYFv5TWPpoSvfhqTAGSxq2UZFV8e3L9UnG46BKt6W");
        postListsWebResponse res2 = new postListsWebResponse(2,"파인정빈","pineapple", "정비니", "https://gateway.pinata.cloud/ipfs/QmdW4tsPJBKASpKvcexfCvqcCh41wyDyeWjRu5dMXcRQP1");
        postListsWebResponse res3 = new postListsWebResponse(3, "고양이","cat","도고양","https://gateway.pinata.cloud/ipfs/QmWorfYFv5TWPpoSvfhqTAGSxq2UZFV8e3L9UnG46BKt6W");

        postlist.add(res);
        postlist.add(res2);
        postlist.add(res3);
        return OK(postlist);
    }
}
