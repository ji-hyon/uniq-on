package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Members{
    @Id
    @Column(length = 255)
    private String walletAddress;

    @Column(length = 255)
    private String name;

    @Column(length = 255)
    private String nickname;

    @Column(length = 255)
    private String birth;

    @Column(length = 30)
    private String gender;

    @Column(length = 255)
    private String vpToken;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] profileImage;

    @Enumerated(EnumType.STRING)
    private MemberRole role;
}