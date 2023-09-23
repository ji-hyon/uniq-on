package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthGasPrice;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;
import org.web3j.utils.Convert;
import pinata.Pinata;
import pinata.PinataResponse;
//import ssafy.uniqon.controller.NFTsController;

import java.io.File;
import java.math.BigInteger;

@Service
@RequiredArgsConstructor
public class NFTCreateService {
//    private final NFTRepository nftRepository;
//    private final Pinata pinata = new Pinata("64e7615856edbac52336", "f62623900242c791dc8cb1243c69b2df8664886f50295a79d43ffe5ffdce0b5c");
//    private static final String ipfsBaseURL="https://gateway.pinata.cloud/ipfs/";
//    private static final Web3j web3j = Web3j.build(new HttpService("http://127.0.0.1:7545"));
//    private final String userPrivateKey="0x522357c8829606f187fb3511522ba2efa2ff35658325a695903106306c623894";
//
//    private final String contractAddress="0x459f50D8faC1a605a47d661d4abD360E82F21bb6";
//
//    private final BigInteger fee=Convert.toWei("0.0005", Convert.Unit.ETHER).toBigInteger();
//


}
