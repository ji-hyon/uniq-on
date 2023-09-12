package ssafy.uniqon.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;

import java.time.LocalDateTime;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sales")
public class SalesController {

    record RegisterReportWebRequest(
            Integer price,
            String content,
            LocalDateTime createDatetime,
            String title,
            String species,
            String creatureName
    ) {
    }

    @PostMapping("/register")
    public Response<?> registerPost(@RequestBody RegisterReportWebRequest req){
        return OK(null);
    }

}
