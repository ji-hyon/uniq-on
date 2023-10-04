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

export function MyWishList() {

  const [myWishList, setMyWishList] = useState([]);
  const [page, setPage] = useState(0);


  useEffect(() => {
  async function getWishlist() {
    try {
      const res = await axios.get(`/api/wishlist`, {
        params: {
          page: page,
          size: 4, // 추후에 불러올 만큼 사이즈 설정
        },
      });
      if (res.status === 200 && res.data.success) {
        console.log(res.data.response.content);
        setMyWishList(res.data.response.content);
      } else if (res.data.error.status === 404) {
        // alert("위시리스트가 존재하지 않습니다");
        console.log(res);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  }
  getWishlist();
}, [page]);

const handlePreviousPage = () => {
  setPage(page - 1);
};

const handleNextPage = () => {
  setPage(page + 1);
};

  return (
    <div className="App">
      {page > 0 && <Button onClick={handlePreviousPage}>이전 페이지</Button>}
      {myWishList.length > 0 && (
        <Button onClick={handleNextPage}>다음 페이지</Button>
      )}
      <div className="flex w-[1200px] items-start gap-[32px] relative flex-wrap">
        {myWishList.map((wish, index) => (
          <div className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
            <div>
              {/* 카드 넣기 */}
              <Card key={index} className="w-full max-w-[20rem] shadow-lg">
                <CardHeader floated={false} color="blue-gray">
                  <img src={wish.image} alt="ui/ux review check" />
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                </CardHeader>
                <CardFooter className="pt-3 pb-3">
                  <Button className="text-sm" size="sm" fullWidth={true}>
                    {wish.name}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
