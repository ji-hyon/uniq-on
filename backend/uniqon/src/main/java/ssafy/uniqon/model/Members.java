package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Members{
    @Id
    @Column(name = "member_id")
    private String id;

    @Column(name = "password")
    private String password;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "profileImage")
    private String profileImage;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @OneToMany(mappedBy = "member")
    private List<Posts> postsList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Wallets> walletsList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Purchases> purchasesList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<PostList> postlistList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<WishList> wishlistList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comments> commentsList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Collections> collectionList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Notifications> notificationsList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<My_Collections> my_collectionsList = new ArrayList<>();
}