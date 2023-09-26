import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

export function MyNft() {
  const [nftList, setNftList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  // 나의 NFT 조회
  useEffect(() => {
    async function getMyNft() {
      try {
        const resonse = await axios.get(`/api/mypage/mynfts`, {
          params: {
            page: page,
            size: 10,
          },
        });
        console.log(resonse);
        if (resonse.success) {
          console.log("성공", resonse);
          setNftList(resonse.resonse.content);
          setTotalPage(resonse.resonse.tototalPages);
        }
      } catch (error) {
        console.log("실패", error);
      }
    }
    getMyNft();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page <= totalPage) {
      setPage(page + 1);
    }
  };

  return (
    <div className="App">
      <p>나의 NFT</p>
      <div className="flex w-[1200px] items-start gap-[32px] relative flex-wrap">
        {nftList.map((nft, index) => (
          <div
            key={index}
            className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]"
          >
            {/* 카드 넣기 */}
            <Card className="w-full max-w-[20rem] shadow-lg">
              <CardHeader floated={false} color="blue-gray">
                <img src="fox.png" alt="ui/ux review check" />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardFooter className="pt-3 pb-3">
                <Button className="text-sm" size="sm" fullWidth={true}>
                  {nft.name}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
        <Button onClick={handlePreviousPage}>이전 페이지</Button>
        <Button onClick={handleNextPage}>다음 페이지</Button>
      </div>
    </div>
  );
}
