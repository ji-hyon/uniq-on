package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ssafy.uniqon.controller.MemberController;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.repository.MemberRepository;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public String signup(MemberController.SignupWebRequest req, MultipartFile multipartFile) throws IOException, SQLException {
        validateDuplicateMember(req.nickname());

        byte[] bytes= multipartFile.getBytes();

        memberRepository.signup(req,bytes);
        return req.nickname();
    }

    private void validateDuplicateMember(String nickname) {
        Members findMember = memberRepository.getMemberByNickname(nickname);
        if (findMember != null) {
            throw new IllegalStateException("이미 가입된 회원입니다.");
        }
    }
}
