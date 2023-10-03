import axios from "axios";
import "./card.css";
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
import { useEffect, useState } from "react";
export function LikeNft() {
  const [likeNftList, setLikeNftList] = useState([]);
  useEffect(() => {
    async function likeCollecList() {
      try {
        const response = await axios.get(`/api/myPage/like-nft-list`, {
          params: {
            page: 0,
            size: 10
          }
        });
        if (response.status === 200) {
          setLikeNftList(response.data.response.content)
          console.log("내가 좋아요 한 NFT 리스트 : ", response.data.response.content);
        }
      } catch (error) {
        console.log("실패", error);
      }
    }
    likeCollecList();
  }, []);

  return (
    <div className="App">
      <div className="flex w-[1200px] items-start gap-[32px] relative flex-wrap">
        {likeNftList.map((index, list) => (
          <div
            key={index}
            className="flip inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]"
          >
            {/* 카드 넣기 */}
            <Card className="card w-full max-w-[20rem] shadow-lg">
              <div className="front">
                <CardHeader floated={false} color="blue-gray">
                  <img src={list.image} alt="ui/ux review check" />
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                </CardHeader>
                <CardFooter className="pt-3 pb-3">
                  <Button className="text-sm" size="sm" fullWidth={true}>
                    {list.name}
                  </Button>
                </CardFooter>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
