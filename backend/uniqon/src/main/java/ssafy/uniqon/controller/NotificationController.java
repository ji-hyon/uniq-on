package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.service.NotificationService;

import static ssafy.uniqon.global.response.Response.ERROR;
import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
@Tag(name = "알림 API")
@CrossOrigin("*")
public class NotificationController {

    public record registerNotificationWebRequest(
            String walletAddress,
            int postId
    ){}

    private final NotificationService notificationService;

    @PostMapping("/{postId}")
    public Response<?> registerNotification(@PathVariable Integer postId) {
        String walletAddress = "0x00000000000000";
        registerNotificationWebRequest req = new registerNotificationWebRequest(walletAddress, postId);
        log.debug("# 알림 생성 요청 : {}", req);
        int result = notificationService.registerNotification(req);
        if (result == 1) {
            log.debug("# 알림 생성 완료!");
            return OK(null);
        } else {
            log.debug("# 알림 생성 실패!");
            return ERROR("알림 생성 실패!", HttpStatus.NOT_FOUND);
        }
    }
}
