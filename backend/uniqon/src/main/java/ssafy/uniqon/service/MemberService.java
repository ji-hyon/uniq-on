package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ssafy.uniqon.controller.MemberController;
import ssafy.uniqon.model.MemberRole;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.repository.MemberRepository;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public String signup(MemberController.SignupWebRequest req, MultipartFile multipartFile) throws IOException, SQLException {
        validateDuplicateMember(req.walletAddress());

        byte[] bytes= multipartFile.getBytes();

        memberRepository.save(new Members(req.walletAddress(),
                req.name(),
                req.nickname(),
                req.birth(),
                req.gender(),
                req.vpToken(),
                bytes,
                null,
                null,
                new ArrayList<>(),
                new ArrayList<>(),
                MemberRole.USER));
        return req.walletAddress();
    }

    private void validateDuplicateMember(String userId) {
        Members member = memberRepository.findById(userId).get();
        if (member != null) {
            throw new IllegalStateException("이미 가입된 회원입니다.");
        }
    }
}
