import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { useTransactionStore } from "../../stores/TransactionStore";

export function ItemDetailCard( { item } ) {

  const { salesItemsList, setSalesItemsList } = useTransactionStore();

  useEffect(() => {
    console.log(item);
    console.log(salesItemsList);
  }, []);

  if (!item) {
    // item 정보가 없을 경우 로딩 또는 오류 처리를 할 수 있습니다.
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-[48rem] flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          // src="/{item.image}"
          src={salesItemsList[0].image}
          alt="card"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          종 분류 |{item.species}{salesItemsList[0].species}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Lyft launching cross-platform lorem ipsum 판매글 제목쓰{item.title}{salesItemsList[0].title}
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          NFT가격 |{item.price}{salesItemsList[0].price}
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          판매자 |{item.nickname}{salesItemsList[0].nickname}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          Like so many organizations these days, Autodesk is a company in
          transition. It was until recently a traditional boxed software company
          selling licenses. Yet its own business model disruption is only part
          of the story
        </Typography>
        <a href="#" className="inline-block">
          <Button variant="text" className="flex items-center gap-2">
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardBody>
    </Card>
  );
}
      