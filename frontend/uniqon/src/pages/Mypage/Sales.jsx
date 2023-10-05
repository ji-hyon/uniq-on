import axios from "axios";
import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
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

export function Sales() {
  // 판매 내역
  const [salesList, setSalesList] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    async function salesList() {
      try {
        const response = await axios.get(`/api/myPage/soldList`, {
          params: {
            page: page,
            size: 4,
          },
        });
        if (response.status === 200) {
          console.log("성공", response);
          setSalesList(response.data.response.content);
        }
      } catch (error) {
        console.log("실패", error);
      }
    }
    salesList();
  }, [page]);

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="App">
      {page > 0 && <Button onClick={handlePreviousPage}><MdArrowBack className="w-6 h-6"></MdArrowBack></Button>}
      {salesList.length > 0 && (
        <Button onClick={handleNextPage}><MdArrowForward className="w-6 h-6"></MdArrowForward></Button>
      )}      
      <div className="flex w-[1200px] items-start gap-[32px] relative flex-wrap">
        {salesList.map((sales, index) => (
          <div
            key={index}
            className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]"
          >
            <Card className="w-full max-w-[20rem] shadow-lg">
              <CardHeader floated={false} color="blue-gray">
                <img src={sales.nftImage} alt="ui/ux review check" />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardFooter className="pt-3 pb-3">
                <h3>구매자 : {sales.buyer}</h3>
                <Button className="text-sm" size="sm" fullWidth={true}>
                  {sales.nftName}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
