package com.diti.core.domain.controller;

import com.diti.core.global.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import static com.diti.core.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/diti/auth")
@Tag(name = "인증 API")
public class AuthController {

    public record loginWebRequest(
    ){}

    @PostMapping("/login")
    public Response<?> login(){
        log.debug("# 로그인 시도중");
        return OK(null);
    }

    @PostMapping("/join")
    public Response<?> join(){
        log.debug("# 회원가입 시도중");
        return OK(null);
    }

    @GetMapping("/vc")
    public Response<?> getVc(){
        log.debug("# VC 반환");
        return OK(null);
    }

    @GetMapping("/list/vc")
    public Response<?> getVcList(){
        log.debug("# VC 리스트 ");
        return OK(null);
    }


}
