import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ItemDetailCard } from "../../components/Common/ItemDetailCard";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { useState } from "react";


export function TranItemDetail () {

  const { id } = useParams();
  const [ item, setItem ] = useState({});
  const URL = "http://localhost:5000"

  useEffect(() => {
    axios.get(URL + `/api/sales/detail/${id}`)
    .then((res) => {
      setItem(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [id]);
  

  return (
    <div className="App">
      
      
    <header className="App-header">
    <div className="flex flex-row justify-center w-full bg-white">
      <div className="bg-white w-[1440px] h-[1024px] relative">
          <TopNavBar />
          <div className="relative top-28">
          {item ? (
                <ItemDetailCard item={item} />
              ) : (
                <p>Loading...</p>
              )}
          </div>
        </div>
      </div>  
        </header>
      </div>
  )
};