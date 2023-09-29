import axios from "axios";
import { useState } from "react";
import { ethers } from "ethers";
import contractAbi from "../../components/NFT/contractAbi.json";
import { useNftStore } from "../../stores/NFTStore";

export function CreateNft() {
  const [imgBase64, setImgBase64] = useState("");
  const [aiImgUrl, setAiImgUrl] = useState("");
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [status, setStatus] = useState(0);
  const [hash, setHash] = useState("");
  const [tokenId, setTokenId] = useState("");
  const contractAddress = "0x303a548f56ff203d435190ea3a082b59d726ce36";
  const [address, setAddress] = useState("");

  const {
    name,
    setName,
    age,
    setAge,
    feature,
    setFeature,
    selectedMain,
    setSelectedMain,
    selectedMiddle,
    setSelectedMiddle
  } = useNftStore();

  // async function aiImg() {
  //   const handleImgChange = (e) => {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setImgBase64(reader.result);
  //     };

  //     if (file) {
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const handleSubmit = async () => {
  //     try {
  //       const dataToSend = JSON.stringify({
  //         init_images: [imgBase64],
  //         species: "spider"
  //       });
  //       console.log("이미지 base64", imgBase64);

  //       const respone1 = await axios.post("/api/img2img", dataToSend, {
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //       });
  //       console.log("이미지 생성 성공", respone1);

  //       const blob = await respone1.data.blob();

  //       const imageUrl = URL.createObjectURL(blob);
  //       setAiImgUrl(imageUrl);
  //     } catch (error) {
  //       console.error("이미지 생성 실패", error);
  //     }
  //     // try {
  //     //   const response1 = await axios.post(`/api/nft/`);
  //     //   console.log("AI 이미지 생성 성공", response1);
  //     // } catch (error) {
  //     //   console.log("AI 이미지 생성 실패", error);
  //     // }
  //   };
  // }

  // 위에 aiimg에 요청해서 받은 이미지 url 담아서 요청
  async function IPFS() {
    try {
      const response2 = await axios.post("/api/nft/ipfs", aiImgUrl);
      console.log("IPFS 저장 성공", response2);
      setIpfsUrl(response2.file);
    } catch (error) {
      console.log("IPFS 저장 실패", error);
    }
  }

  // 위에 IPFS에 요청해서 받은 ipfsJsonUrl 담아서 요청
  async function BlockChain() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // 싸피 네트워크 주소로 변경
    const net = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
    // console.log(net)
    const signer = await provider.getSigner();
    //나중에 싸피 네트워크 컨트랙트 주소로 변경 필요
    // const contractAddress="0x6fc6B313E41117C2Bf293C9E7a12cc8248d95245"
    const contractAddress = "0x303a548f56ff203d435190ea3a082b59d726ce36";
    const gasProvider = await provider.getFeeData();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer,
      gasProvider
    );

    const fee = ethers.parseEther("0.0005");
    const options = { value: fee };
    //백에서 받은 ipfsJsonUrl 넣어주기
    const ipfsJsonUrl = ipfsUrl;
    const receipt = await contractInstance
      .connect(signer)
      .mintNFT(signer.address, ipfsJsonUrl, options);
    const txReceipt = await net.getTransactionReceipt(receipt.hash);

    setStatus(txReceipt.status);

    setHash(receipt.hash);
    setTokenId(parseInt(txReceipt.logs[1].data, 16));
    setAddress(signer.address);

    // status 1이면 성공 아니면 실패
    // 에러 처리 해서 실패했을 경우엔 백에 다음 요청 보내지 않기
    console.log(txReceipt.status);

    //다음 요청에 보내야 하는 값들
    console.log(receipt.hash); //tx hash
    console.log(parseInt(txReceipt.logs[1].data, 16)); //tokenId
    console.log(contractAddress); //컨트랙트 주소
    console.log(signer.address);
  }

  if (status === 1) {
    async function NftRegister() {
      try {
        const data = {
          middleClassificationName: selectedMiddle,
          name: name,
          feature: feature,
          age: age
        };
        const response4 = await axios.post(
          "/api/nft/register",
          data,
          hash,
          tokenId,
          contractAddress,
          address
        );
        console.log("NFT 발급 성공", response4);
      } catch (error) {
        console.log("NFT 발급 실패", error);
      }
    }
  } else {
    console.log("status 1이 아니므로 실패");
  }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <input type="file" onChange={handleImgChange} />
  //       <button onClick={handleSubmit}>AI이미지</button>
  //       {aiImgUrl && <img src={imageUrl} alt="Processed"></img>}
  //     </header>
  //   </div>
  // );
}
