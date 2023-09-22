import React from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { useTransactionStore } from "../../stores/TransactionStore";

export function ItemDetailCard( { item } ) {

  const [postId, setPostId] = React.useState('1');
  const [wishId, setWishId] = React.useState('1');


  // 아직 상세아이템 조회 api가 없어서 하드코딩하려고 거래 store에서 salesItemList 사용
  const { salesItemsList, setSalesItemsList } = useTransactionStore();

  useEffect(() => {
    console.log(item);
    console.log(salesItemsList);
  }, []);

  if (!item) {
    // item 정보가 없을 경우 로딩 또는 오류 처리를 할 수 있습니다.
    return <div>Loading...</div>;
  }

  async function addWishlist() {
      
    try {
        const res = await axios.post(`/api/wishlist/add/${postId}`);
          console.log(res.data)

      } catch(err) {
        console.log(err)
      }
    }

  async function deleteWishlist() {
      
    try {
        const res = await axios.delete(`/api/wishlist/${wishId}`);
          console.log(res.data)

      } catch(err) {
        console.log(err)
      }
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
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"

        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
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
          of the story {item.content}
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
      