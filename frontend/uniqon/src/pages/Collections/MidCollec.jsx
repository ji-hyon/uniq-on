import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCollectionsStore } from '../../stores/CollectionsStore';
import { MidModal } from '../../components/Collections/NftModal';
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
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Pagination } from './Pagination';
import { TopNavBar } from '../../components/Common/TopNavBar';

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
  const [selectedCard, setSelectedCard] = useState({ id: '', image: '', feature: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    async function middleList() {
      try {
        const response = await axios.get(`/api/collections/list/middle/${mainCollecId}`);
        console.log('success', response);

        setMidCardsData(response.data.response.content);
      } catch (e) {
        console.log('failed: ', e);
      }
    }
    middleList();
  }, [currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = midCardsData.slice(startIndex, endIndex);

  const goToNFTList = () => {
    navigate('/nftlist');
  };

  const clickCard = (card) => {
    console.log('selectedcard', card);
    setSelectedCard({
      id: card.id,
      image: card.image,
      feature: card.feature
    });
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-row justify-center w-full bg-white">
          <div className="bg-white w-[1440px] h-[1024px] relative">
            <TopNavBar></TopNavBar>
            <p>중분류 페이지 입니다.</p>
            <br></br>
            <div className="flex space-x-4 mt-16  6">
              {currentPageData.map((card, index) => (
                <Card
                  onClick={() => {
                    setMidCollecId(card.id);
                    setMidCollecType(card.species);
                    setMidCollecImg(card.image);
                    clickCard(card);
                  }}
                  key={index}
                  className="w-full max-w-[20rem] shadow-lg"
                >
                  <CardHeader floated={false} color="blue-gray">
                    <img src={card.image} alt="ui/ux review check" />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                    <IconButton size="sm" color="red" variant="text" className="!absolute top-4 right-4 rounded-full">
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
                        setMidCollecId(card.id);
                        setMidCollecType(card.species);
                        setMidCollecImg(card.image);
                        clickCard(card);
                      }}
                      className="text-lg"
                      size="lg"
                      fullWidth={true}
                    >
                      {card.species}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <br></br>
            <div>
              <MidModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedCard={selectedCard}
                goToNft={goToNFTList}
              ></MidModal>
            </div>
            {isModalOpen ? null : (
              <div className="flex justify-center">
                <Pagination
                  totalPages={Math.ceil(midCardsData.length / pageSize)}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                ></Pagination>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
