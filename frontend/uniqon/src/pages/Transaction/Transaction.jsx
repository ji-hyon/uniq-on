import React from "react";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, CardHeader, Dialog, Input, Typography } from "@material-tailwind/react";
import { useTransactionStore } from "../../stores/TransactionStore";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { SalesCard } from "../../components/Common/SalesCard";
import { TransactionBanner } from "../../components/Transaction/TransactionBanner";
import { RegisterSalesItem } from "./RegisterSalesItem";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

export function Transaction() {
  const navigate = useNavigate();
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => { setOpen(!open); };
  // const [등록할NFTid, set등록할NFTid] = useState("");



  

  const { salesItemsList, setSalesItemsList,
      itemsPriceList, setItemsPriceList,
      itemImageList, setItemImageList,
      itemNicknameList, setItemNicknameList,
      itemSpeciesList, setItemSpeciesList,
      itemTitleList, setItemTitleList } = useTransactionStore();

  
  const URL = "http://localhost:5000"


  // useEffect(() => {
  //   getDefaultSales();
  // }, []);

  // function getDefaultSales() {
  //   axios.get(URL + "/api/sales/post")
  //   .then((res) => {
  //     console.log(res.data)
  //     setSalesItemsList(res.data.response)
  //     console.log(salesItemsList)
  //   })
  // }

  async function getSales() {
        
    try{

      const res = await axios.get(URL + "/api/sales/post");
            console.log(res.data)
            setSalesItemsList(res.data.response)
            console.log(salesItemsList)
        } catch(err) {
          console.log(err)
        }
      }

  async function registerSales() {

      try {
        const data = {
          price: 1000,
          content: "test",
          title: "test",
          nftId: 1,
        };


        const res = await axios.post(URL + "/api/sales/register", data, {
          headers: {
            },
        });
        console.log(res.data)
        
      } catch (err) {
        console.log(err);
      }
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
          {/* <Button onClick={handleOpen} variant="gradient" className="self-end">
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
            <Input label="판매 NFT 선택" value={등록할NFTit} size="lg" onChange={(e) => set등록할NFTid(e.target.value)}/>
            <Input label="판매글 제목" value={title} size="lg" onChange={(e) => setTitle(e.target.value)} />
            <Input label="판매글 내용" value={content} size="lg" onChange={(e) => setContent(e.target.value)}/>
            <Input label="판매 가격" value={price} size="lg" onChange={(e) => setPrice(e.target.value)}/>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={() => {handleOpen(); registerSales(title, content, price)}} fullWidth>
              등록
            </Button>
          </CardFooter>
        </Card>
      </Dialog> */}
      
          <div className="flex flex-row justify-evenly">
            {salesItemsList.map((item, index) => {
              return <SalesCard key={index} item={item} id={index} />
            })}
          </div>

        <Button color="teal" onClick={getSales}>판매글 조회</Button>
        <br></br>
        <RegisterSalesItem />
        </div>
        </div>
      </header>
      
    </div>
  );
}