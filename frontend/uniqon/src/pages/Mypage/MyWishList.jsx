import axios from "axios";
import { useEffect, useState } from "react";
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

export function MyWishList() {

  async function getWishlist() {
    try {
      const res = await axios.get(`/api/wishlist`, {
        params: {
          page: 0,
          size: 10, // 추후에 불러올 만큼 사이즈 설정
        },
      });
      if (res.status === 200 && res.data.success) {
        console.log(res.data.response.content);
      } else if (res.data.error.status === 404) {
        alert("위시리스트가 존재하지 않습니다");
        console.log(res);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <Button className="" onClick={getWishlist}>getWishlist</Button>
    </div>
  );
}
