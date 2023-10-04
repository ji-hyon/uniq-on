package ssafy.uniqon.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
public class CustomErrorController implements ErrorController {
    // error path를 꼭 "/error" 로 하자!
    private final String ERROR_PATH = "/error";

    @GetMapping(ERROR_PATH)
    public String redirectRoot(){
        log.warn("들어오니?");
        log.warn("들어오니?");
        log.warn("들어오니?");
        log.warn("들어오니?");
        return "index.html";
    }
    public String getErrorPath(){
        return ERROR_PATH;
    }
}