import React from "react";
import axios from "axios";
import { ItemDetailCard } from "../../components/Common/ItemDetailCard";
import { TopNavBar } from "../../components/Common/TopNavBar";

export function TranItemDetail () {
  return (
    <div className="App">
      
      
    <header className="App-header">
    <div className="flex flex-row justify-center w-full bg-white">
      <div className="bg-white w-[1440px] h-[1024px] relative">
          <TopNavBar />
          <div className="relative top-28">
            <ItemDetailCard />
            <ItemDetailCard />
          </div>
        </div>
      </div>  
        </header>
      </div>
  )
};