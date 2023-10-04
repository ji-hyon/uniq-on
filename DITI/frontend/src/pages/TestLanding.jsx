import React from 'react';
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export function TestLanding() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="App-header">
          {/* 메타마스크 연동 버튼 */}
          {/* < MetaMask /> */}
          <Button
            className="text-4xl w-96 h-28 m-3"
            color="green"
            onClick={() => {
              navigate("login");
            }}
          >
            MetaMask 로그인
          </Button>

          {/* 신분증 발급 버튼 */}
          <Button
            className="text-4xl w-96 h-28 m-3"
            color="blue"
            onClick={() => {
              navigate("issue");
            }}
          >
            전자 신분증 발급
          </Button>
              
          {/* 신분증 조회 버튼 */}
          <Button
            className="text-4xl w-96 h-28 m-3"
            color="yellow"
            onClick={() => {
              navigate("check");
            }}
          >
            전자 신분증 조회 
          </Button>
      </div>

    </div>
  );
}