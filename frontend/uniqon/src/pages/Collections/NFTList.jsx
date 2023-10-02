import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NftModal } from "../../components/Collections/NftModal";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Input
} from "@material-tailwind/react";
import { useCollectionsStore } from "../../stores/CollectionsStore";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { TiArrowLeftThick } from "react-icons/ti";

export function NFTList() {
  const {
    mainCollecId,
    setMainCollecId,
    midCollecId,
    setMidCollecId,
    midCollecType,
    setMidCollecType,
    midCollecImg,
    setMidCollecImg
  } = useCollectionsStore();

  const navigate = useNavigate();
  const [nftData, setNftData] = useState([]);
  const [selectedNft, setSelectedNft] = useState({
    id: "",
    image: "",
    name: "",
    age: "",
    nickname: "",
    feature: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    async function nftList() {
      try {
        const response = await axios.get(
          `/api/collections/list/nft/${midCollecId}`
        );
        console.log("success", response);

        setNftData(response.data.response.content);
      } catch (e) {
        console.log("failed", e);
      }
    }
    nftList();
  }, [currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = nftData.slice(startIndex, endIndex);

  const clickNft = (card) => {
    console.log("selectednft", card);
    setSelectedNft({
      id: card.id,
      name: card.name,
      image: card.image,
      age: card.age,
      nickname: card.nickname,
      feature: card.feature
    });
    setIsModalOpen(true);

    // setMidCollecType(card.species);
    // setMidCollecImg(card.image);
  };

  // 검색 기능
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/collections/search`, {
        params: {
          query: searchKeyword
        }
      });
      setNftData(response.data.response.content);
      console.log("검색 결과", response.data.response.content);
    } catch (error) {
      console.log("검색 요청 실패", error);
    }
  };

  // 검색 키 다운
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-row justify-center w-full bg-white">
          <div className="bg-white w-[1440px] h-[1024px] relative">
            <TopNavBar></TopNavBar>

            <div className="relative flex w-full max-w-[24rem] mt-12 top-10 left-[65rem]">
              <Input
                type="text"
                label="검색어를 입력하세요"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                // style={{ color: 'black ', borderColor: 'black' }}
                containerProps={{ className: "flex-grow" }}
              ></Input>
              <Button
                size="sm"
                onClick={handleSearch}
                className="!absolute right-1 top-1.5 rounded"
              >
                검색
              </Button>
            </div>

            <br></br>
            {/* 선택된 중분류 카드 보여줌 */}
            <div className="flex  flex-col items-center">
              <div className="mt-[220px] mb-[180px] px-4 relative">
                <div className="absolute left-1/2 top-1/2 h-80 w-72 -translate-x-1/2 -translate-y-1/2  rounded-2xl bg-teal-100"></div>

                <div className="absolute left-1/2 top-1/2 h-80 w-72 -translate-x-1/2 -translate-y-1/2  space-y-6 rounded-2xl bg-teal-50 p-6 transition duration-300 hover:rotate-6">
                  <div className="flex justify-end">
                    <div className="h-4 w-4 rounded-full bg-white"></div>
                  </div>

                  <div className="flex justify-center">
                    <img
                      src={midCollecImg}
                      alt="ui/ux review check"
                      className="h-48 -mt-4 aspect-square "
                    />
                  </div>

                  <footer className="flex justify-center">
                    <Button
                      variant="filled"
                      // color="teal"
                      // className="w-28 bg-[#80B6AB] -mt-4 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#FF7308]"
                      // className="w-28 bg-[#7FD1AE] -mt-4 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#FF7308]"
                      className="w-48 bg-[#00A990] -mt-2 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#80B6AB]"
                    >
                      {midCollecType}
                    </Button>
                  </footer>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col items-center">
              <Card className="w-full max-w-[20rem] shadow-lg ">
                <CardHeader floated={false} color="blue-gray">
                  <img src={midCollecImg} alt="ui/ux review check" />
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                </CardHeader>
                <CardFooter className="pt-5">
                  <Button className="text-lg" size="lg" fullWidth={true}>
                    {midCollecType}
                  </Button>
                </CardFooter>
              </Card>
            </div> */}
            <br></br>

            {/* NFT 카드 리스트를 보여줌 */}
            <div className="flex space-x-4">
              {nftData.map((card, index) => (
                <Card
                  onClick={() => clickNft(card)}
                  key={index}
                  className="w-full max-w-[20rem] shadow-lg"
                >
                  <CardHeader floated={false} color="blue-gray">
                    <img src={card.image} alt="ui/ux review check" />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                    <IconButton
                      size="sm"
                      color="red"
                      variant="text"
                      className="!absolute top-4 right-4 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </IconButton>
                  </CardHeader>
                  <CardFooter className="pt-5">
                    <Button
                      onClick={() => {
                        clickNft(card);
                      }}
                      className="text-lg"
                      size="lg"
                      fullWidth={true}
                    >
                      {card.ownerNickname}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <br></br>
            <div>
              <NftModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedNft={selectedNft}
              ></NftModal>
            </div>
            <div className="flex flex-row">
              <div style={{ marginRight: "600px" }}>
                <Button onClick={() => navigate(-1)}>
                  <TiArrowLeftThick
                    style={{ fontSize: "20px" }}
                  ></TiArrowLeftThick>
                </Button>
              </div>
              <div className="flex items-center ">
                <Pagination
                  totalPages={Math.ceil(nftData.length / pageSize)}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                ></Pagination>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
