import React from "react";

export function TopNavBar() {
  return(
    <>
    <div className="flex max-w-[1600px] w-[1440px] min-h-[80px] items-center justify-between pl-[24px] pr-[24.01px] py-[16px] relative">
      <div className="relative flex-1 grow h-[36px]">
        <img
          className="absolute w-[171px] h-[79px] top-[-22px] left-[4px] object-cover"
          alt="Link foundation logo"
          src="link-foundation-logo-SVG.png"
        />
        <div className="inline-flex items-start justify-center absolute top-0 left-[213px] shadow-[0px_4px_4px_#00000040]">
          <div className="inline-flex h-[36px] items-center justify-center pl-[18.5px] pr-[18.3px] pt-[9px] pb-[8px] relative flex-[0_0_auto] rounded-full">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#000000b2] text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
              마켓플레이스
            </div>
          </div>
          <button className="inline-flex h-[36px] items-center justify-center pt-[9px] pb-[8px] px-[24.14px] relative flex-[0_0_auto] rounded-full all-[unset] box-border">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#000000b2] text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
              도감
            </div>
          </button>
          <div className="relative flex-[0_0_auto] h-[36px] rounded-full" />
        </div>
      </div>
      <div className="flex items-center justify-center pl-[8.65px] pr-[8.68px] py-0 relative flex-1 grow">
        <div className="relative w-[500px] h-[48px] ml-[-26.67px] mr-[-26.67px]">
          <div className="relative h-[48px] rounded-full">
            <div className="flex w-[500px] min-h-[48px] items-center pl-[48px] pr-[32px] py-px absolute top-0 left-0 bg-[#0000000d] rounded-full overflow-hidden">
              <div className="inline-flex flex-col items-start pl-0 pr-[330px] py-0 relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#00000066] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                  Search NFT
                </div>
              </div>
            </div>
            <img className="absolute w-[18px] h-[18px] top-[15px] left-[20px]" alt="Svg" src="SVG.svg" />
          </div>
        </div>
      </div>
      <div className="h-[48px] relative flex-1 grow">
        <button className="absolute w-[154px] h-[48px] top-0 left-[131px] bg-[#f8f0f0] rounded-full shadow-[0px_4px_4px_#00000040] all-[unset] box-border">
          <div className="relative w-[146px] h-[105px] top-[-29px] left-[-24px]">
            <div className="absolute h-[19px] top-[42px] left-[84px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-black text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
              NFT 생성
            </div>
            <img className="absolute w-[34px] h-[36px] top-[35px] left-10" alt="Video player" src="nftlogo.png" />
            <img className="absolute w-[112px] h-[105px] top-0 left-0" alt="Video player" src="video.svg" />
          </div>
        </button>
        <button className="absolute w-[154px] h-[48px] top-0 left-[310px] bg-black rounded-full shadow-[0px_4px_4px_#00000040] all-[unset] box-border">
          <div className="absolute h-[19px] top-[13px] left-[56px] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-white text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            마이페이지
          </div>
          <img
            className="absolute w-[33px] h-[33px] top-[7px] left-[10px] object-cover"
            alt="Avatars avatar"
            src="3d_avatar_28.png"
          />
        </button>
      </div>
    </div>
    </>
  )
};