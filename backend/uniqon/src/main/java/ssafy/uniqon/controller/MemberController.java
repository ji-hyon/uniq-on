package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.service.MemberService;

import java.io.IOException;
import java.sql.SQLException;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@Tag(name = "유저 API")
@CrossOrigin("*")
public class MemberController {

    public record SignupWebRequest(
            String walletAddress,
            String name,
            String nickname,
            String birth,
            String gender,
            String vpToken
    ){}

    record LoginWebRequest(
            String walletAddress
    ){}

    private final MemberService memberService;

    @PostMapping("/signup")
    public Response<?> signup(@RequestPart(value = "data")  SignupWebRequest req,
                           @RequestPart(value = "file") MultipartFile multipartFile) throws SQLException, IOException {

        return OK(memberService.signup(req,multipartFile));
    }

//    @GetMapping("/login")
//    public Response<?> login() {
//        return OK(memberService.login(String walletAddress));
//    }
}
