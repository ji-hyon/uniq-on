package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.MemberController;
import ssafy.uniqon.repository.MemberRepository;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public void signup(MemberController.SignupWebRequest req){
        memberRepository.signup(req);
    }
}
