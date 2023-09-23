package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NFTs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nft_id")
    private int id;

    @Column(name = "nft_tx_hash", length = 200)
    private String nftTxHash;

    @Column(name = "image", length = 512)
    private String image;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "age")
    private int age;

    @Column(name = "feature", length = 200)
    private String feature;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wallet_address")
    private Members owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "middle_classification_id")
    private MiddleClassifications middle;

    @OneToMany(mappedBy = "nfts")
    private List<MyCollections> myCollection=new ArrayList<>();

    @Column(name="nft_URL",length = 200)
    private String nftURL;

    @Column(length = 200)
    private String contractAddress;

    private int tokenId;
}