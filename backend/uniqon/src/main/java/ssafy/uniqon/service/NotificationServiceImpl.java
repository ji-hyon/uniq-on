package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.NotificationController;
import ssafy.uniqon.global.exception.NotFoundException;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.Notifications;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.repository.MemberRepository;
import ssafy.uniqon.repository.NotificationRepository;
import ssafy.uniqon.repository.PostsRepository;


@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

    private final MemberRepository memberRepository;
    private final PostsRepository postsRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public int registerNotification(NotificationController.registerNotificationWebRequest req) {
        Members members = memberRepository.findById(req.walletAddress()).orElseThrow(
                () -> new NotFoundException(Members.class, req.walletAddress()));
        Posts posts = postsRepository.findById(req.postId());
        Notifications notifications = notificationRepository.findByPost_IdAndMember_WalletAddress(req.postId(), req.walletAddress());
        if (members != null && posts != null && notifications == null) {
            log.debug("{}", members);
            log.debug("{}", posts);
            log.debug("# 알림 추가중 ...");
            notificationRepository.save(Notifications.builder()
                    .member(members)
                    .post(posts)
                    .checked(false)
                    .build());
            return 1;
        } else {
            log.debug(" 알림 추가 실패!");
            return 0;
        }
    }
}
