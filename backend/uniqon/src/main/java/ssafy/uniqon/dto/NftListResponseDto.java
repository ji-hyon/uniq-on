package ssafy.uniqon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NftListResponseDto {

    private Integer id;
    private String nftTxHash;
    private String image;
    private String name;
    private Integer age;
    private String feature;
    private String middleClassificationId;
    private Integer ownerNickname;
    private Integer ownerProfileImage;
    private String middleSpecies;
    private String nftURL;
    private String contractAddress;
    private Integer tokenId;
}
