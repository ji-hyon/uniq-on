package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthGasPrice;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;
import org.web3j.utils.Convert;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.NFTs;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.model.TransactionHistories;
import ssafy.uniqon.repository.MemberRepository;
import ssafy.uniqon.repository.NFTRepository;
import ssafy.uniqon.repository.PostsRepository;
import ssafy.uniqon.repository.TransactionHistoriesRepository;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Optional;

@RequiredArgsConstructor
public class NFTServiceImpl implements NFTService {
    private final MemberRepository memberRepository;
    private final PostsRepository postsRepository;
    private final NFTRepository nftRepository;
    private final TransactionHistoriesRepository transactionHistoriesRepository;
    private final Web3j web3j = Web3j.build(new HttpService("http://127.0.0.1:7545"));
    private final String userPrivateKey = "0x522357c8829606f187fb3511522ba2efa2ff35658325a695903106306c623894";
    private final String contractAddress = "0x459f50D8faC1a605a47d661d4abD360E82F21bb6";
//    private final BigInteger price= Convert.toWei("0.0005", Convert.Unit.ETHER).toBigInteger();

    @Override
    public void transactNFT(Integer nftId, String buyer, Integer postId) throws Exception {
        Credentials credential = Credentials.create(userPrivateKey);
//        System.out.println(credential.getAddress());
        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
        BigInteger gasPrice = ethGasPrice.getGasPrice();
        ContractGasProvider gasProvider = new StaticGasProvider(gasPrice, BigInteger.valueOf(2_100_000L));

        UniqonNFT contract = UniqonNFT.load(
                contractAddress, web3j, credential, gasProvider);

        if (contract.isValid()) {
            Members buyerMember = memberRepository.findById(buyer).get();
            Posts post = postsRepository.findById(postId).get();
            NFTs nft = nftRepository.findById(nftId).get();
            Members seller = post.getSeller();
            BigInteger price= Convert.toWei(post.getPrice(), Convert.Unit.ETHER).toBigInteger();
            TransactionReceipt receipt = contract.saleNFT(seller.getWalletAddress(),
                    price,
                    BigInteger.valueOf(nft.getTokenId()),
                    price).send();
            String txHash=receipt.getTransactionHash();
            transactionHistoriesRepository.save(new TransactionHistories(null,seller,buyerMember,txHash));
        }

        web3j.shutdown();
    }
}
