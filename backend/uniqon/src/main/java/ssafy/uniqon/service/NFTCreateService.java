package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.ChainId;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import pinata.Pinata;
import pinata.PinataResponse;
import pinata.PinataException;
import ssafy.uniqon.controller.NFTsController;

import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class NFTCreateService {
    private final Pinata pinata = new Pinata("64e7615856edbac52336", "f62623900242c791dc8cb1243c69b2df8664886f50295a79d43ffe5ffdce0b5c");
    private final String ipfsBaseURL="https://gateway.pinata.cloud/ipfs/";
    private final Web3j web3j = Web3j.build(new HttpService("http://127.0.0.1:7545"));
    private final String userPrivateKey="0xAA85A9EF3D6aab3e2d55970148Ea27799CB08c38";

    public void createNFT(NFTsController.RegisterNFTWebRequest req) throws Exception {
        File image=new File("C:\\Users\\SSAFY\\Desktop\\KakaoTalk_20230915_100944894.jpg");
        PinataResponse pinataImageResponse=pinata.pinFileToIpfs(image);
        String[] bodySplit = pinataImageResponse.getBody().split(",");
        String imageIpfsHash=ipfsBaseURL+bodySplit[0].substring(bodySplit[0].indexOf(":")+2,bodySplit[0].length()-1);
//        System.out.println(imageIpfsHash);
        JSONObject jsonMetaData=new JSONObject();
        jsonMetaData.put("name",req.name());
        jsonMetaData.put("middleClassificationId",req.middleClassificationId());
        jsonMetaData.put("age",req.age());
        jsonMetaData.put("feature",req.feature());
        jsonMetaData.put("image",imageIpfsHash);
        PinataResponse pinataJsonResponse=pinata.pinJsonToIpfs(jsonMetaData);
        bodySplit = pinataJsonResponse.getBody().split(",");
        String jsonIpfsHash=ipfsBaseURL+bodySplit[0].substring(bodySplit[0].indexOf(":")+2,bodySplit[0].length()-1);
        System.out.println(jsonIpfsHash);

        Credentials credential = Credentials.create(userPrivateKey);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        TransactionManager transactionManager = new RawTransactionManager(
                web3j, credential, 3554);
        UniqonNFT contract = UniqonNFT.load(
                "0xb65459534EB1e728484cbBb813266014A6C5424e", web3j,transactionManager, gasProvider);
        if (contract.isValid()) {
            String s=contract.owner().send();
            System.out.println(s);
        }

        web3j.shutdown();
    }
}
