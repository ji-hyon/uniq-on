package com.diti.core.domain.controller;

import com.diti.core.domain.service.AuthService;
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

    private final AuthService authService;

    @PostMapping("/login")
    public Response<?> login(@RequestBody String walletAddress){
        log.debug("# 로그인 요청 : {}", walletAddress);
        authService.loginAuth(walletAddress);
        return OK(null);
    }

    @PostMapping("/join")
    public Response<?> join(@RequestBody String walletAddress){
        log.debug("# 회원가입 요청 : {}", walletAddress);
        authService.registerAuth(walletAddress);
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
