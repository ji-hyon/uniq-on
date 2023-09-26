import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Button, Dialog,
Card, CardFooter, CardHeader, CardBody, Typography, Input } from "@material-tailwind/react";

export function ContemLogin() {

  const [walletAddress, setwalletAddress] = React.useState("111");
  const [password, setPassword] = React.useState("woaud123");
  

  const navigate = useNavigate();

  async function loginUser() {
    try {
      const data = {
      walletAddress: walletAddress,
      password: password,
    
    }
    const res = await axios.post("/api/auth/login", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(res.data.response);
  } catch (err) {
    console.log(err);
  }
}


  return (
    <div>
    <div
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              로그인
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="아이디" value={walletAddress} size="lg" onChange={(e) => setwalletAddress(e.target.value)}/>
            <Input label="비밀번호" value={password} size="lg" onChange={(e) => setPassword(e.target.value)} />

          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={() => {loginUser(); navigate("/transaction"); }} fullWidth>
              로그인하기
            </Button>
          </CardFooter>
        </Card>
      </div>
      </div>
  );
}