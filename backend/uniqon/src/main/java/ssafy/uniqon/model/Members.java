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
    @Column(name = "did_address", length = 255)
    private String did_address;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "nickname", length = 50)
    private String nickname;


    @OneToMany()
    private List<Posts> postsList = new ArrayList<>();

    @OneToMany()
    private List<NFTs> nftsList = new ArrayList<>();

    @OneToMany()
    private List<Purchases> purchasesList = new ArrayList<>();

    @OneToMany()
    private List<PostList> postlistList = new ArrayList<>();

    @OneToMany()
    private List<WishList> wishlistList = new ArrayList<>();

    @OneToMany()
    private List<Notifications> notificationsList = new ArrayList<>();

    @OneToMany()
    private List<My_Collections> my_collectionsList = new ArrayList<>();
}