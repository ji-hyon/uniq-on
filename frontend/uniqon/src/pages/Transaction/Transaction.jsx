import React from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { useTransactionStore } from "../../stores/TransactionStore";
import { TopNavBar } from "../../components/Common/TopNavBar";

import { useEffect, useState } from "react";

export function Transaction() {
  

  const URL = "http://localhost:5000"

  async function getSales() {
        
    try{

      const res = await axios.get(URL + "/api/sales/post");
            console.log(res.data)

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
          creatureName: "test",
        };

        const res = await axios.post(URL + "/api/sales/register", data);
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

          const res = await axios.put(URL + "/api/sales/update/1", data);
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
      <TopNavBar />
      
      
      <header className="App-header">
        <p>
          Transaction
        </p>
        <br></br>

        <Button color="teal" onClick={getSales}>판매글 조회</Button>
        <br></br>
        <Button color="yellow" onClick={registerSales}>판매 등록</Button>
        <br></br>
        <Button color="blue" onClick={updateSales}>판매 수정</Button>
        <br></br>
        <Button color="cyan" onClick={deleteSales}>판매 삭제</Button>
        <br></br>
        <Button color="red" onClick={serachSales}>판매 검색</Button>
        <br></br>
        <Button color="indigo" onClick={detailSales}>판매 상세</Button>
      </header>
    </div>
  );
}