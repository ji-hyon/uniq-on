package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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



    @PostMapping("/signup")
    public void signup(@RequestPart(value = "data")  SignupWebRequest req,
                       @RequestPart(value = "file") MultipartFile multipartFile){

    }
}
