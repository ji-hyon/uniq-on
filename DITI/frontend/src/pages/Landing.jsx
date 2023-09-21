import React from 'react';
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export function Landing() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col w-[1440px] items-start relative">
          <Button
            className="text-4xl w-96 h-28"
            onClick={() => {
              navigate("/issue");

            }}
            color="red"
          >

            전자 신분증 발급
          </Button>
        </div>
      </header>

    </div>
  );
}