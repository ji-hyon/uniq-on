import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Badge
} from "@material-tailwind/react";
import { useCollectionsStore } from "../../stores/CollectionsStore";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { TopNavBar } from "../../components/Common/TopNavBar";

export function MainCollections() {
  const navigate = useNavigate();
  const {
    mainCollecId,
    setMainCollecId,
    mainCollecType,
    setMainCollecType,
    mainCollecImg,
    setMainCollecImg
  } = useCollectionsStore();

  const [mainCardsData, setMainCardsData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // 한 페이지에 보여줄 아이템 개수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log("현재 페이지", currentPage);
  console.log("카드 데이터", mainCardsData);

  useEffect(() => {
    async function mainList() {
      try {
        const response = await axios.get(`/api/collections/list/main`, {
          // params: {
          //   page: currentPage,
          //   size: pageSize
          // }
        });
        console.log("success", response);

        setMainCardsData(response.data.response.content);
      } catch (e) {
        console.log("failed", e);
      }
    }
    mainList();
  }, [currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = mainCardsData.slice(startIndex, endIndex);

  const goToMiddle = () => {
    navigate("/midcollections");
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-row justify-center w-full bg-white">
          <div className="bg-white w-[1440px] h-[1024px] relative">
            <TopNavBar></TopNavBar>
            <p>여기는 대분류 페이지 입니다.</p>
            <br></br>
            <Badge content="5">
              <Button>
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 14 20"
                >
                  <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                </svg>
              </Button>
            </Badge>

            <br></br>
            {/* /// */}
            {/* <div className="flex mt-64 -mx-4 flex-wrap"> */}
            <div className="flex mt-60 -mx-4 flex-wrap h-[52px]">
              {currentPageData.map((card, index) => (
                <div key={index} className="w-1/4 mb-[430px] px-4 relative">
                  <div className="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2  rounded-2xl bg-teal-100"></div>

                  <div className="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2  space-y-6 rounded-2xl bg-teal-50 p-6 transition duration-300 hover:rotate-6">
                    <div className="flex justify-end=">
                      <div className="h-5 w-5 rounded-full bg-white"></div>
                    </div>

                    <div
                      onClick={() => {
                        setMainCollecId(card.id);
                        setMainCollecType(card.type);
                        setMainCollecImg(card.image);
                        goToMiddle();
                      }}
                      className="flex justify-center"
                    >
                      <img
                        src={card.image}
                        alt="ui/ux review check"
                        className="h-64 -mt-2 aspect-square "
                      />
                    </div>

                    <footer className="flex justify-center">
                      <Button
                        variant="filled"
                        // color="teal"
                        // className="w-28 bg-[#80B6AB] -mt-4 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#FF7308]"
                        // className="w-28 bg-[#7FD1AE] -mt-4 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#FF7308]"
                        className="w-28 bg-[#00A990] -mt-4 justify-center flex items-baseline gap-2 rounded-lg px-4 py-2.5 text-xl font-bold text-white hover:bg-[#80B6AB]"
                      >
                        {card.type}
                      </Button>
                    </footer>
                  </div>
                </div>
              ))}
            </div>

            {/* /// */}
            {/* <div className="flex -mx-4 flex-wrap">
              {currentPageData.map((card, index) => (
                <div key={index} className="w-1/4 h-1/4 px-4 mb-8 ">
                  <div className=" space-y-6 rounded-2xl bg-gray-100 p-6 transition duration-300 hover:rotate-6">
                    <div className="flex justify-end">
                      <div className="h-4 w-4 rounded-full bg-gray-900"></div>
                    </div>


                    <div
                      onClick={() => {
                        setMainCollecId(card.id);
                        setMainCollecType(card.type);
                        setMainCollecImg(card.image);
                        goToMiddle();
                      }}
                      className="flex justify-center "
                    >
                      <img
                        src={card.image}
                        alt="ui/ux review check"
                        className="h-64 aspect-square"
                      />
                    </div>

                    <footer className="mb-10 flex justify-center">
                      <button className="flex w-28 justify-center gap-2 rounded-lg bg-[#FE5401] px-4 py-2.5  text-xl font-bold text-white hover:bg-[#FF7308]">
                          
                      </button>
                    </footer>
                  </div>
                </div>
              ))} */}

            {/* {currentPageData.map((card, index) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4, xl:w-1/4 mb-4"
                  key={index}
                >
                  <Card
                    onClick={() => {
                      setMainCollecId(card.id);
                      setMainCollecType(card.type);
                      setMainCollecImg(card.image);
                      goToMiddle();
                    }}
                    key={index}
                    className="max-w-xs md:max-w-sm lg:max-w-full mx-auto shadow-lg"
                    style={{ margin: "0.5rem" }}
                  >
                    <CardHeader
                      floated={false}
                      color="white"
                      className="h-72 flex items-center"
                    >
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
                          setMainCollecId(card.id);
                          setMainCollecType(card.type);
                          setMainCollecImg(card.image);
                          goToMiddle();
                        }}
                        className="text-lg"
                        size="lg"
                        fullWidth={true}
                      >
                        {card.type}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))} */}
            {/* </div> */}

            <br></br>

            {/* <main class="grid min-h-screen w-full place-items-center bg-gray-900">
              <div class="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-2xl bg-gray-400"></div>

              <div class="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2 rotate-6 space-y-6 rounded-2xl bg-gray-100 p-6 transition duration-300 hover:rotate-0">
                <div class="flex justify-end">
                  <div class="h-4 w-4 rounded-full bg-gray-900"></div>
                </div>

                <header class="text-center text-xl font-extrabold text-gray-600">
                  2021.09.01
                </header>

                <div>
                  <p class="text-center text-5xl font-extrabold text-gray-900">
                    Online Test (Physics)
                  </p>
                  <p class="text-center text-4xl font-extrabold text-[#FE5401]">
                    2 hours
                  </p>
                </div>

                <footer class="mb-10 flex justify-center">
                  <button class="flex items-baseline gap-2 rounded-lg bg-[#FE5401] px-4 py-2.5 text-xl font-bold text-white hover:bg-[#FF7308]">
                    <span>Start</span>
                    <i class="fas fa-hand-peace text-xl"></i>
                  </button>
                </footer>
              </div>
            </main> */}
            {/* <div className="flex justify-center mt-36">
              <Pagination
                totalPages={Math.ceil(mainCardsData.length / pageSize)}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              ></Pagination>
            </div> */}
          </div>
        </div>
      </header>
    </div>
  );
}
