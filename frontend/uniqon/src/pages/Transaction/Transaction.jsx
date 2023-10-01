import React from "react";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, CardHeader, Dialog, Input, Typography,Textarea } from "@material-tailwind/react";
import { useTransactionStore } from "../../stores/TransactionStore";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { SalesCard } from "../../components/Common/SalesCard";
import { TransactionBanner } from "../../components/Transaction/TransactionBanner";
import { RegisterSalesItem } from "./RegisterSalesItem";
import useUserInfoStore from "../../stores/UserInfoStore";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

export function Transaction() {

  const { accessToken, walletAddress } = useUserInfoStore();

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(!open); };
  const [nftId, setnftId] = useState("1");
  const [title, setTitle] = useState("test");
  const [content, setContent] = useState("test");
  const [price, setPrice] = useState("1000");

  const { salesItemsList, setSalesItemsList  
    } = useTransactionStore();


  useEffect(() => {
    // console.log(accessToken)
    getSales();
  }, []);
  

  // 판매글 등록시에 내가 가지고 있는 NFT 조회
  
  // const [nftList, setNftList] = useState([]);
  // const [page, setPage] = useState(0);
  // // const [totalPage, setTotalPage] = useState(0);
  // // 나의 NFT 조회
  // useEffect(() => {
  //   async function getMyNft() {
  //     try {
  //       const response = await axios.get(`/api/myPage/mynfts`, {
  //         params: {
  //           page: page,
  //           size: 3, // 추후에 이 부분은 원하는 갯수로 변경
  //         },
  //       });
  //       if (response.status === 200) {
  //         setNftList(response.data.response.content);
  //       }
  //     } catch (error) {
  //       console.log("실패", error);
  //     }
  //   }
  //   getMyNft();
  // }, [page]);

  async function getSales() {
        
    try{
      const params = {
        walletAddress: walletAddress,
        page: 1,
        size: 9,
      };

      const res = await axios.get("/api/sales/post", {
        headers: {
          Authorization: "Bearer " + accessToken,
          },
      } , {
        params: params,
      });
            console.log(res.data.response) // response에 담긴 값 확인
            setSalesItemsList(res.data.response)
            console.log(salesItemsList) // salesItemsList에 담긴 값 확인
        } catch(err) {
          console.log(err)
        }
      }

  async function registerSales(title, content, price, nftId) {

      try {
        const data = {
          price: price,
          content: content,
          title: title,
          nftId: nftId,
        };


        const res = await axios.post("/api/sales/register", data, {
          // headers: {
          //   Authorization: "Bearer " + accessToken,
          //   },
        });
        console.log(res.data)
        
      } catch (err) {
        console.log(err);
      }
    }

    
      const groupedSalesItems = [];
    for (let i = 0; i < salesItemsList.length; i += 3) {
      groupedSalesItems.push(salesItemsList.slice(i, i + 3));
    }


  return (
    <div className="App">
      
      
      <header className="App-header">
      <div className="flex flex-row justify-center w-full bg-white">
        <div className="bg-white w-[1440px] h-[1024px] relative">
          <TopNavBar />
          <p>
            Transaction
          </p>
          <br></br>
          <TransactionBanner />
          <Button onClick={handleOpen} variant="gradient" className="self-end">
        판매글 등록
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              판매글 등록
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">

            
          {/* 내가 가진 nft 목록 중에서 선택하기 */}
          {/* {nftList.map((nft, index) => (
          <div className="inline-flex flex-col min-w-[320px] items-start relative flex-[0_0_auto] bg-white rounded-[8px] overflow-hidden shadow-[0px_8px_40px_#0000000a,0px_2px_5px_#0000000d,0px_0px_2px_#00000026]">
            <div>
             // 카드 넣기
              <Card key={index} className="w-full max-w-[20rem] shadow-lg">
                <CardHeader floated={false} color="blue-gray">
                  <img src={nft.image} alt="ui/ux review check" />
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                </CardHeader>
                <CardFooter className="pt-3 pb-3">
                  <Button className="text-sm" size="sm" fullWidth={true}>
                    {nft.name}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ))} */}

            <Input color="blue" label="판매 NFT선택" value={nftId} size="lg" onChange={(e) => setnftId(e.target.value)}/>
            <Input color="blue" label="판매글 제목" value={title} size="lg" onChange={(e) => setTitle(e.target.value)} />
            <Input color="blue" label="판매 가격(ETH)" value={price} size="lg" onChange={(e) => setPrice(e.target.value)}/>
            <Textarea color="blue" label="판매글 내용" value={content} size="lg" onChange={(e) => setContent(e.target.value)}/>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={() => {handleOpen(); registerSales(title, content, price, nftId)}} fullWidth>
              등록
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      
          <div className="flex flex-col justify-center">
              {/* 판매글 목록을 3개씩 한 줄에 보여주기 */}
              {groupedSalesItems.map((salesGroup, index) => (
                <div key={index} className="flex flex-row justify-evenly">
                  {salesGroup.map((item) => (
                    <SalesCard key={item.postId} item={item} id={item.postId} />
                  ))}
                </div>
              ))}
            </div>
          

        <Button color="teal" onClick={getSales}>판매글 조회</Button>
        <br></br>
        {/* <RegisterSalesItem /> */}
        </div>
        </div>
      </header>
      
    </div>
  );
}