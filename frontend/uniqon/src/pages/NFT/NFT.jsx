import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { Select, Option, Input, Textarea } from "@material-tailwind/react";
import { ethers } from "ethers";
import contractAbi from "../../components/NFT/contractAbi.json";
import useUserInfoStore from "../../stores/UserInfoStore";
import { CreateNft } from "./NftRegister";
import { useNftStore } from "../../stores/NFTStore";

export function NFT() {
  const nftImg = useRef(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [feature, setFeature] = useState("");

  const [selectedMain, setSelectedMain] = useState("");
  const [selectedMiddle, setSelectedMiddle] = useState("");

  const { accessToken } = useUserInfoStore();

  const mainOptions = [
    "여우",
    "도마뱀",
    "거북이",
    "앵무새",
    "물고기",
    "뱀",
    "카멜레온",
    "기타"
  ];
  const middleOptions = {
    여우: [
      "벵골여우",
      "아프간여우",
      "케이프여우",
      "코사크여우",
      "티베트모래여우",
      "키트여우",
      "스위프트여우",
      "그 외"
    ],
    도마뱀: [
      "비어디드래곤 도마뱀",
      "레오파드게코 도마뱀",
      "턱수염도마뱀",
      "표범도마뱀붙이",
      "토카이게코 도마뱀",
      "액키즈드워프 도마뱀",
      "러프납테일게코 도마뱀",
      "그 외"
    ],
    거북이: [
      "쟁기거북",
      "붉은귀거북",
      "아프리카 사이드넥 거북",
      "동부상자거북",
      "서양거북",
      "미시시피지도거북",
      "커먼 머스크 터틀",
      "점박이 거북",
      "노란배 슬러이더",
      "그 외"
    ],
    앵무새: [
      "금강앵무",
      "썬코뉴어",
      "왕관앵무",
      "모란앵무",
      "검은머리카이큐",
      "오색앵무",
      "유황앵무",
      "청금강",
      "사랑앵무",
      "코뉴어",
      "그 외"
    ],
    물고기: [
      "구피",
      "네온테트라",
      "제브라다니오",
      "베타",
      "플라워혼",
      "알지이터",
      "라미레지",
      "브리카르디",
      "플래티",
      "그 외"
    ],
    뱀: [
      "킹코브라",
      "콘 스네이크(옥수수뱀)",
      "밀크스네이크",
      "킹 스네이크",
      "볼파이톤",
      "그 외"
    ],
    카멜레온: [
      "베일드 카멜레온",
      "피그미 카멜레온",
      "팬서 카멜레온",
      "파슨 카멜레온",
      "세네갈 카멜레온",
      "잭슨 카멜레온 표범 카멜레온",
      "그 외"
    ],
    기타: ["그 외"]
  };

  const [imgBase64, setImgBase64] = useState("");
  // const [aiImgUrl, setAiImgUrl] = useState("");
  const aiImgUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Indianfox.jpg/300px-Indianfox.jpg";
  const [ipfsUrl, setIpfsUrl] = useState({imageIpfsHash:"",nftMetadataHash:""});
  const [status, setStatus] = useState(0);
  const [hash, setHash] = useState("");
  const [tokenId, setTokenId] = useState(0);
  const contractAddress = "0x303a548f56ff203d435190ea3a082b59d726ce36";
  const [address, setAddress] = useState("");

  // 대분류 값 변경
  const mainChange = (selectedMain) => {
    console.log("대분류 변경전", selectedMain);
    setSelectedMain(selectedMain);
    console.log("대분류 변경 후", selectedMain);
  };

  // 중분류 값 변경
  const middleChange = (selectedMiddle) => {
    console.log("중분류 변경 전", selectedMiddle);
    setSelectedMiddle(selectedMiddle);
    console.log("중분류 변경 후", selectedMiddle);
  };

  // useEffect(() => {
  //   setSelectedMiddle("");
  // }, [selectedMain]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = JSON.stringify({
        init_images: [imgBase64],
        species: "spider"
      });
      console.log("이미지 base64", imgBase64);

      const respone1 = await axios.post("/api/img2img", dataToSend, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("이미지 생성 성공", respone1);

      const blob = await respone1.data.blob();

      const imageUrl = URL.createObjectURL(blob);
      // setAiImgUrl(imageUrl);
    } catch (error) {
      console.error("이미지 생성 실패", error);
    }
  };

  async function CreateNft() {
    // 위에 aiimg에 요청해서 받은 이미지 url 담아서 요청
    var formData = new FormData();
    // formData.append('data', {
    //   middleClassificationId: selectedMiddle,
    //   name: name,
    //   feature: feature,
    //   age: Number(age)
    // }, { contentType: 'application/json' });
    // const reqData = {file: nftImg.current.files[0],
    //   data:{
    //   middleClassificationName: selectedMiddle,
    //   name: name,
    //   feature: feature,
    //   age: age}
    // };
    formData.append("file", nftImg.current.files[0]);
    const json = JSON.stringify({
      name: name,
      middleClassificationName: selectedMiddle,
      feature: feature,
      age: age
    });
    formData.append("data", new Blob([json], { type: "application/json" }));
    try {
      console.log("실행1");
      const response2 = await axios.post("/api/nfts/ipfs", formData, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("IPFS 저장 성공", response2);
      setIpfsUrl(response2.data.response);
      console.log("ipfsurl", ipfsUrl);
    } catch (error) {
      console.log("IPFS 저장 실패", error);
      console.log(typeof selectedMiddle);
      console.log(typeof name);
      console.log(typeof feature);
      console.log(typeof age);
    }

    // 위에 IPFS에 요청해서 받은 ipfsJsonUrl 담아서 요청
    const provider = new ethers.BrowserProvider(window.ethereum);
    // 싸피 네트워크 주소로 변경
    const net = new ethers.JsonRpcProvider(
      "https://gethrpc.ssafy-blockchain.com"
    );
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
    const ipfsJsonUrl = ipfsUrl.nftMetadataHash;
    const receipt = await contractInstance
      .connect(signer)
      .mintNFT(signer.address, ipfsJsonUrl, options);
    const txReceipt = await net.getTransactionReceipt(receipt.hash);
    console.log(txReceipt);
    setStatus(txReceipt.status);

    setHash(receipt.hash);
    setTokenId(parseInt(txReceipt.logs[1].data, 16));
    setAddress(signer.address);
    console.log("2번째 실행");
    // status 1이면 성공 아니면 실패
    // 에러 처리 해서 실패했을 경우엔 백에 다음 요청 보내지 않기
    console.log(txReceipt.status);

    //다음 요청에 보내야 하는 값들
    console.log(receipt.hash); //tx hash
    console.log(parseInt(txReceipt.logs[1].data, 16)); //tokenId
    console.log(contractAddress); //컨트랙트 주소
    console.log(signer.address);

    if (status === 1) {
      console.log("3번째");
      try {
        // const data = {
        //   middleClassificationName: selectedMiddle,
        //   name: name,
        //   feature: feature,
        //   age: age
        // };
        const response4 = await axios.post(
          "/api/nfts/register",
          {
            middleClassificaitonName: selectedMiddle,
            txHash: hash,
            tokenId: tokenId,
            contractAddress: contractAddress,
            walletAddress: address,
            name: name,
            age: age,
            feature: feature
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken
            }
          }
        );
        console.log("NFT 발급 성공", response4);
      } catch (error) {
        console.log("NFT 발급 실패", error);
      }
    }
    // } else {
    //   console.log("status 1이 아니므로 실패");
    // }
  }

  // nft 등록
  // async function nftAdd() {
  //   try {
  //     // 요청을 보낼 데이터
  //     const data = {
  //       walletAddress: "string",
  //       middleClassificationId: selectedMiddle,
  //       nftAddress: "string",
  //       name: name,
  //       feature: feature,
  //       age: age
  //     };

  //     const formData = new FormData();
  //     formData.append(
  //       "data",
  //       new Blob([JSON.stringify(data)], { type: "application/json" })
  //     );
  //     formData.append("file", nftImg.current.files[0]);

  //     const response = await axios.post("/api/nfts/register", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       },
  //       // 파일 직접 넣기
  //       file: nftImg.current.files[0]
  //     });

  //     console.log("success: ", response);
  //   } catch (e) {
  //     console.log("failed: ", e);
  //   }
  // }

  // nft 조회
  // async function nftInfo() {
  //   try {
  //     const response = await axios.get("/api/nfts/0");
  //     console.log("success: ", response);
  //   } catch (e) {
  //     console.log("failed: ", e);
  //   }
  // }

  // nft 삭제
  // async function nftDelete() {
  //   try {
  //     const response = await axios.delete("/api/nfts/0");
  //     console.log("success: ", response);
  //   } catch (e) {
  //     console.log("failed: ", e);
  //   }
  // }

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-row justify-center w-full bg-white">
          <div className="bg-white w-[1440px] h-[1024px] relative">
            <TopNavBar />

            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex flex-row items-center space-y-6 md:space-y-0 md:space-x-20">
                <Card className="w-96">
                  <CardHeader floated={false} className="">
                    <span className="flex justify-center">
                      <lord-icon
                        src="https://cdn.lordicon.com/qfbuijil.json"
                        trigger="hover"
                        colors="outline:#121331,primary:#f24c00,secondary:#2ca58d,tertiary:#ebe6ef"
                        style={{ width: "150px", height: "150px" }}
                      />
                      <lord-icon
                        src="https://cdn.lordicon.com/emzrtjck.json"
                        trigger="hover"
                        colors="outline:#121331,primary:#08a88a"
                        style={{ width: "150px", height: "150px" }}
                      />
                    </span>
                  </CardHeader>
                  <CardBody className="text-center">
                    <span>
                      <input
                        type="file"
                        onChange={handleImgChange}
                        ref={nftImg}
                      />
                      <Button onClick={handleSubmit}>AI이미지</Button>
                      <Button
                        className="m-5 text-3xl w-70 h-30"
                        onClick={CreateNft}
                        color="blue"
                      >
                        NFT 발급
                        <lord-icon
                          src="https://cdn.lordicon.com/ejxwvtlg.json"
                          trigger="hover"
                          colors="outline:#121331,primary:#08a88a,secondary:#ebe6ef"
                          style={{ width: "250px", height: "250px" }}
                        ></lord-icon>
                      </Button>
                    </span>
                  </CardBody>
                </Card>

                <div className="flex w-96 flex-col gap-20">
                  <Select
                    variant="standard"
                    label="대분류"
                    onChange={mainChange}
                  >
                    {mainOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                  {/* {selectedMain && ( */}
                  <Select
                    variant="standard"
                    label="중분류"
                    onChange={middleChange}
                  >
                    {selectedMain &&
                      middleOptions[selectedMain].map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                  </Select>

                  {/* )} */}
                  <Input
                    variant="standard"
                    label="이름"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    variant="standard"
                    label="나이"
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <Textarea
                    label="특징"
                    onChange={(e) => setFeature(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <input type="file" onChange={handleImgChange} />
            <button onClick={handleSubmit}>AI이미지</button>
            {aiImgUrl && <img src={aiImgUrl} alt="Proceessed"></img>}

            {/* NFT 조회 버튼 */}
            {/* <Button
            className="m-5 text-3xl w-70 h-30"
            onClick={nftInfo}
            color="blue"
            >
            NFT 조회
          </Button> */}

            {/* NFT 삭제 버튼 */}
            {/* <Button
            className="m-5 text-3xl w-70 h-30"
            onClick={nftDelete}
            color="blue"
            >
            NFT 삭제 
          </Button> */}
          </div>
        </div>
      </header>
    </div>
  );
}
