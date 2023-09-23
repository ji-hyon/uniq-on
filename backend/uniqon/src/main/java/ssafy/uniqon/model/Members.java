package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Members{

    @Id
    @Column(name = "member_id", length = 255)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;


    @Id
    @Column(name = "wallet_Address", length = 255)
    private String walletAddress;

    private String name;

    private String nickname;

    private String birth;

    private String gender;

    private String vpToken;

    private String profileImage;

    @CreationTimestamp
    private Timestamp registerDateTime;

    @UpdateTimestamp
    private Timestamp modifyDateTime;
}