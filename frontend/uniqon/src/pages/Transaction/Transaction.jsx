import React from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { useTransactionStore } from "../../stores/TransactionStore";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { SalesCard } from "../../components/Common/SalesCard";
import { TransactionBanner } from "../../components/Transaction/TransactionBanner";

import { useEffect, useState } from "react";

export function Transaction() {
  const nftImg = React.useRef(null);

  const { salesItemsList, setSalesItemsList,
      itemsPriceList, setItemsPriceList,
      itemImageList, setItemImageList,
      itemNicknameList, setItemNicknameList,
      itemSpeciesList, setItemSpeciesList,
      itemTitleList, setItemTitleList } = useTransactionStore();

  // salesItemsList에서 맵 함수로 인덱스로 아이템 한개씩 뽑아서
  // SalesCard에 props로 넘겨주기
  // salesItemsList.map((item, index) => {
  //   return <SalesCard key={index} item={item} />
  // })
  // 그 다음 SalesCard에서 props로 받아서 사용하기 ( item.image 랑 등등 있음 )
  // function SalesCard({ item }) {
  //   return (
  //      <>
  //     <Card className="w-full max-w-[26rem] shadow-lg">
  //       <CardHeader floated={false} color="blue-gray">
  //         <img
  //           src={item.image}
  //           alt="ui/ux review check"
  //         />
  // </CardHeader>
  //       </Card>
  //      </>
  //   )
  

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
          species: "test",
        };

        const formData = new FormData()
        formData.append("data", new Blob([JSON.stringify(data)], {type: "application/json"}))
        formData.append("file", nftImg.current.files[0])

        const res = await axios.post(URL + "/api/sales/register", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',  
            },

            file: nftImg.current.files[0],
        });
        console.log(res.data)
        
      } catch (err) {
        console.log(err);
      }
    }

  async function updateSales() {

        try {
        const data = {
            price: 1000,
          };

          const formData = new FormData()
          formData.append("data", new Blob([JSON.stringify(data)], {type: "application/json"}))
          formData.append("file", nftImg.current.files[0])

          const res = await axios.put(URL + "/api/sales/update/1", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',  
              },
              file: nftImg.current.files[0],
          });
            console.log(res.data)

        } catch(err) {
          console.log(err)
        }
      }

  async function deleteSales() {

        try {
          const res = await axios.delete(URL + "/api/sales/delete/1");
            console.log(res.data)

        } catch(err) {
          console.log(err)
        }
      }

  async function serachSales() {

        try {
          const res = await axios.get(URL + "/api/sales/search/word=1");
            console.log(res.data)

        } catch(err) {
          console.log(err)
        }
      }

  async function detailSales() {
          
    try {
            const res = await axios.get(URL + "/api/sales/detail/1");
              console.log(res.data)

          } catch(err) {
            console.log(err)
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

          <SalesCard />

        <SalesCard />

        <Button color="teal" onClick={getSales}>판매글 조회</Button>
        <br></br>
        <span>
        <input 
            type="file"
            ref={nftImg}
            />
        <Button color="yellow" onClick={registerSales}>판매 등록</Button>
            </span>
        <br></br>
        <Button color="blue" onClick={updateSales}>판매 수정</Button>
        <br></br>
        <Button color="cyan" onClick={deleteSales}>판매 삭제</Button>
        <br></br>
        <Button color="red" onClick={serachSales}>판매 검색</Button>
        <br></br>
        <Button color="indigo" onClick={detailSales}>판매 상세</Button>
        </div>
        </div>
      </header>
    </div>
  );
}