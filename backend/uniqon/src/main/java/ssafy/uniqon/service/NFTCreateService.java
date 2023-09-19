package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.ChainId;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Convert;
import pinata.Pinata;
import pinata.PinataResponse;
import pinata.PinataException;
import ssafy.uniqon.controller.NFTsController;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class NFTCreateService {
    private final Pinata pinata = new Pinata("64e7615856edbac52336", "f62623900242c791dc8cb1243c69b2df8664886f50295a79d43ffe5ffdce0b5c");
    private final String ipfsBaseURL="https://gateway.pinata.cloud/ipfs/";
    private static final Web3j web3j = Web3j.build(new HttpService("http://127.0.0.1:7545"));
    private final String userPrivateKey="0x522357c8829606f187fb3511522ba2efa2ff35658325a695903106306c623894";
    private static final String userAddress="0xAA85A9EF3D6aab3e2d55970148Ea27799CB08c38";

    private final String contractAddress="0x459f50D8faC1a605a47d661d4abD360E82F21bb6";

    private final BigInteger fee=Convert.toWei("0.0005", Convert.Unit.ETHER).toBigInteger();

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
//        System.out.println(jsonIpfsHash);

        Credentials credential = Credentials.create(userPrivateKey);
        System.out.println(credential.getAddress());
        ContractGasProvider gasProvider = new DefaultGasProvider();
        TransactionManager transactionManager = new RawTransactionManager(
                web3j, credential, 3554);
        UniqonNFT contract = UniqonNFT.load(
                contractAddress, web3j,transactionManager, gasProvider);
        System.out.println(Convert.toWei("0.0005", Convert.Unit.ETHER).toBigInteger());
        if (contract.isValid()) {
//            RemoteFunctionCall<TransactionReceipt> txReceipt=contract.setBaseTokenURI("");
//            System.out.println(txReceipt.decodeFunctionResponse(txReceipt.encodeFunctionCall()));
//            RemoteFunctionCall<TransactionReceipt> txReceipt=contract.mintNFT(credential.getAddress(),jsonIpfsHash,fee);
            TransactionReceipt transactionReceipt=contract.mintNFT(credential.getAddress(),jsonIpfsHash,fee).send();
            System.out.println(transactionReceipt.toString());
        }

        web3j.shutdown();
    }
}
