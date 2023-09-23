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
    @Column(name = "wallet_Address")
    private String walletAddress;

    private String name;

    private String nickname;

    private String birth;

    private String gender;

    @Column(length = 700)
    private String vpToken;

    private String profileImage;

    @CreationTimestamp
    private Timestamp registerDateTime;

    @UpdateTimestamp
    private Timestamp modifyDateTime;
}