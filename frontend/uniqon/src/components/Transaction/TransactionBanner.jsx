import React from "react";

export function TransactionBanner() {
  return(
    <>
    <div className="bg-[#c1dcdc] flex flex-row justify-center w-full">
      <div className="bg-[#c1dcdc] w-[1178px] h-[372px] relative">
        <div className="absolute w-[493px] h-[59px] top-[206px] left-[53px] bg-[#ffffff] rounded-[4.67px] overflow-hidden">
          <div className="absolute w-[41px] h-[38px] top-[11px] left-[438px] bg-[100%_100%]">
            <img className="absolute w-[20px] h-[19px] top-[10px] left-[11px]" alt="Search" src="Search.svg" />
          </div>
        </div>
        <img
          className="absolute w-[207px] h-[100px] top-[198px] left-[571px]"
          alt="Vector stroke"
          src="Vector186.svg"
        />
        <img className="absolute w-[350px] h-[320px] top-[50px] left-[778px] bg-[100%_100%]" src="heedong2.png" alt="heedong2">
        </img>
        <p className="absolute w-[673px] top-[52px] left-[53px] [font-family:'Pretendard-ExtraBold',Helvetica] font-extrabold text-black text-[40px] tracking-[0] leading-[24.9px]">
          비밀의 동물원, 여기서 NFT로 만나보세요!
        </p>
        <div className="absolute w-[375px] top-[131px] left-[53px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-black text-[23px] tracking-[0] leading-[24.9px]">
          디지털 아카이브: 희귀동물의 이야기
        </div>
      </div>
    </div>
    </>
  )
}