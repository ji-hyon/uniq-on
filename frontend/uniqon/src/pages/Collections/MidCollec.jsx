import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCollectionsStore } from "../../stores/CollectionsStore";
import { MidModal } from "../../components/Collections/NftModal";
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
import { TiMediaRecord } from "react-icons/ti";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { TiArrowLeftThick } from "react-icons/ti";

export function MidCollections() {
  const navigate = useNavigate();

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

  const [midCardsData, setMidCardsData] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    id: "",
    image: "",
    feature: ""
  });
  const splitFeature = selectedCard.feature.split("/");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isHovered, setIsHovered] = useState(true);
  const [hoveredCards, setHoveredCards] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleHovered = (card, isHovered) => {
    if (card) {
      setSelectedCard({
        id: card.id,
        image: card.image,
        feature: card.feature
      });
      setHoveredCards((preHoveredCards) => ({
        ...preHoveredCards,
        [card.id]: isHovered
      }));
    }
    // setIsHovered(!isHovered);
  };

  useEffect(() => {
    // handleHovered(null);

    async function middleList() {
      try {
        const response = await axios.get(
          `/api/collections/list/middle/${mainCollecId}`
        );
        console.log("success", response);

        setMidCardsData(response.data.response.content);
      } catch (e) {
        console.log("failed: ", e);
      }
    }
    middleList();

    // handleHovered(null, false);
  }, [currentPage, mainCollecId]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = midCardsData.slice(startIndex, endIndex);

  const goToNFTList = () => {
    navigate("/nftlist");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-row justify-center w-full bg-white">
          <div className="bg-white w-[1440px] h-[1024px] relative">
            <TopNavBar></TopNavBar>

            <br></br>
            {/* <div className="flex mt-60 -mx-4 flex-wrap h-[52px]">
              {currentPageData.map((card, index) => (
                <div
                  key={index}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="w-1/4 mb-[430px] px-4 relative"
                >
                  <div className="absolute left-1/2 top-1/2 h-80 w-72 -translate-x-1/2 -translate-y-1/2  rounded-2xl bg-teal-100"></div>

                  <div className="absolute left-1/2 top-1/2 h-80 w-72 -translate-x-1/2 -translate-y-1/2  space-y-6 rounded-2xl bg-teal-50 p-6 transition duration-300 hover:rotate-6">
                    <div className="flex justify-end">
                      <div className="h-4 w-4 rounded-full bg-white"></div>
                    </div>

                    <div
                      onClick={() => {
                        setMidCollecId(card.id);
                        setMidCollecType(card.species);
                        setMidCollecImg(card.image);
                        goToNFTList();
                      }}
                      onMouseEnter={() => handleHovered(card)}
                      className="flex justify-center"
                    >
                      <img
                        src={card.image}
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
                        className="w-48 bg-[#00A990] -mt-2 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#FF7308]"
                      >
                        {card.species}
                      </Button>
                    </footer>
                  </div>
                </div>
              ))}
            </div> */}

            <div className="flex mt-60 -mx-4 flex-wrap h-[52px]">
              {currentPageData.map((card, index) => (
                <div key={index} className="w-1/4 mb-[430px] px-4 relative">
                  <div
                    onMouseEnter={() => handleHovered(card, true)}
                    onMouseLeave={() => handleHovered(card, false)}
                  >
                    <div className="absolute left-1/2 top-1/2 h-80 w-72 -translate-x-1/2 -translate-y-1/2  rounded-2xl bg-teal-100"></div>
                    {hoveredCards[card.id] ? (
                      <div className="absolute left-1/2 top-1/2 h-80 w-72 -translate-x-1/2 -translate-y-1/2  space-y-6 rounded-2xl bg-teal-50 p-6 transition duration-300 hover:rotate-6 flex items-center justify-center">
                        <div
                          onClick={() => {
                            setMidCollecId(card.id);
                            setMidCollecType(card.species);
                            setMidCollecImg(card.image);
                            goToNFTList();
                          }}
                          // onMouseLeave={() => handleHovered(null)}
                          className="flex justify-center"
                        >
                          <p style={{ color: "black", fontSize: "18px" }}>
                            {splitFeature.map((feature, index) => (
                              <div key={index}>
                                {index !== splitFeature.length - 1 && (
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center"
                                    }}
                                  >
                                    {index + 1}. {feature}.
                                  </span>
                                )}
                              </div>
                            ))}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute left-1/2 top-1/2 h-80 w-72 -translate-x-1/2 -translate-y-1/2  space-y-6 rounded-2xl bg-teal-50 p-6 transition duration-300 hover:rotate-6">
                        <div className="flex justify-end">
                          <div className="h-4 w-4 rounded-full bg-white"></div>
                        </div>

                        <div
                          onClick={() => {
                            setMidCollecId(card.id);
                            setMidCollecType(card.species);
                            setMidCollecImg(card.image);
                            goToNFTList();
                          }}
                          // onMouseEnter={() => handleHovered(card)}
                          className="flex justify-center"
                        >
                          <img
                            src={card.image}
                            alt="ui/ux review check"
                            className="h-48 -mt-4 aspect-square "
                          />
                        </div>

                        <footer className="flex justify-center">
                          <Button
                            onClick={() => {
                              setMidCollecId(card.id);
                              setMidCollecType(card.species);
                              setMidCollecImg(card.image);
                              goToNFTList();
                            }}
                            variant="filled"
                            style={{ fontSize: "15px" }}
                            // color="teal"
                            // className="w-28 bg-[#80B6AB] -mt-4 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#FF7308]"
                            // className="w-28 bg-[#7FD1AE] -mt-4 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#FF7308]"
                            className="w-52 bg-[#00A990] -mt-2 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#80B6AB]"
                          >
                            {card.species}
                          </Button>
                        </footer>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="flex space-x-4 mt-16  6">
              {currentPageData.map((card, index) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4"
                  key={index}
                >
                  <div className="cards" key={index}>
                    {!isHovered ? (
                      // <div className="card card-front">
                      <Card
                        onClick={() => {
                          setMidCollecId(card.id);
                          setMidCollecType(card.species);
                          setMidCollecImg(card.image);
                          goToNFTList();
                        }}
                        onMouseEnter={() => handleHovered(card)}
                        className="max-w-xs md:max-w-sm lg:max-w-full mx-auto shadow-lg"
                        style={{ position: "relative", margin: "0.5rem" }}
                      >
                        <CardHeader
                          floated={false}
                          color="white"
                          className="flex items-center"
                        >
                          <img
                            src={card.image}
                            alt="ui/ux review check"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </CardHeader>
                        <CardFooter className="pt-5">
                          <Button
                            onClick={() => {
                              setMidCollecId(card.id);
                              setMidCollecType(card.species);
                              setMidCollecImg(card.image);
                              goToNFTList();

                            }}
                            className="text-lg"
                            size="lg"
                            fullWidth={true}
                          >
                            {card.species}
                          </Button>
                        </CardFooter>
                      </Card>
                    ) : (
                      <Card
                        key={index}
                        className="max-w-xs md:max-w-sm lg:max-w-full mx-auto shadow-lg"
                        onMouseLeave={() => handleHovered()}
                        onClick={() => {
                          setMidCollecId(card.id);
                          setMidCollecType(card.species);
                          setMidCollecImg(card.image);
                          goToNFTList();
                        }}
                      >
                        <CardHeader floated={false} color="blue-gray">
                          <div
                            className="lightgray-box flex items-center justify-center" // 회색 네모 박스에 스타일을 적용하기 위한 클래스
                            style={{
                              // width: "30vw", // 너비를 100%로 설정
                              height: "32vh", // 높이를 100%로 설정
                              background: "gray" // 배경색을 회색으로 설정
                              // whiteSpace: "pre-line"
                              // position: "absolute" // 상대 위치 설정
                            }}
                          >
                            <p>
                              {splitFeature.map((feature) => (
                                <div>{feature}</div>
                              ))}
                            </p>
                          </div>
                        </CardHeader>
                      </Card>
                    )}
                  </div>
                </div>
              ))}
            </div> */}
            <br></br>
            <div
              className="flex flex-row justify-between"
              style={{
                position: "fixed",
                bottom: "20px",
                left: "30px",
                right: "670px",
                padding: "0 20px" // 좌우 여백을 조정
              }}
            >
              <div>
                <Button onClick={() => navigate(-1)}>
                  <TiArrowLeftThick
                    style={{ fontSize: "20px" }}
                  ></TiArrowLeftThick>
                </Button>
              </div>
              <div className="flex items-center">
                <Pagination
                  totalPages={Math.ceil(midCardsData.length / pageSize)}
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
