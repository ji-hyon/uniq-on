import React from 'react';
import { Button } from "@material-tailwind/react";

export function CheckCert() {


  return (
    <div className="App">
        <div className="App-header">

        <div className='m-10'>발급받은 신분증 리스트 조회</div>

        <div className='border-while border-solid border-4 m-3'>
          <div className='p-20'>전자 신분증</div>

            {/* 신분증 조회 버튼 */}
            <Button
              className="text-2xl w-50 h-28 m-7"
              color="green"
            >
              전자 신분증 갱신
            </Button>
        </div>

        </div>
    </div>
  );
}