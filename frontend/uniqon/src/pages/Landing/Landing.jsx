import React from 'react';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Section1 } from '../../components/Landing/Section1';
import { Section2 } from '../../components/Landing/Section2';
import { Section3 } from '../../components/Landing/Section3';
import { Section4 } from '../../components/Landing/Section4';
// import LoginButton from '../../components/Auth/LoginButton';

export function Landing() {



  const navigate = useNavigate();

  async function loginUser() {
    try {
      const data = {
        walletAddress: "111",
        password: "woaud123",

      }
      const res = await axios.post("/api/auth/login", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(res.data.response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <div className="flex flex-col w-[1440px] items-start relative">
      <Section1 />
      <Section2 />
      <Section3 />
      {/* <Section4 /> */}
      </div>

      <Button onClick={loginUser}></Button>

        <p>
          여기는 랜딩페이지입니다.
        </p>

        <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/login");

          }}
          color="green"
        >
          로그인
        </Button>

        <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/signup");

          }}
          color="orange"
        >
          회원가입
        </Button>

        <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/collections");

          }}
          color="red"
        >

          도감
        </Button>
        <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/mypage");

          }}
          color="yellow"
        >

          마이페이지
        </Button>
        <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/transaction");

          }}
          color="black"
        >

          거래
        </Button>
        <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/wishlist");

          }}
          color="blue"
        >

          위시리스트
        </Button>
        <Button
          className="text-4xl w-96 h-28"
          onClick={() => {
            navigate("/nft");

          }}
          color="purple"
        >

          NFT
        </Button>
      </header>

    </div>
  );
}