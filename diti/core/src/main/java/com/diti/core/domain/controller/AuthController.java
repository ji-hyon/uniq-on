package com.diti.core.domain.controller;

import com.diti.core.global.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.diti.core.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/diti/auth")
@Tag(name = "인증 API")
public class AuthController {

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

}
