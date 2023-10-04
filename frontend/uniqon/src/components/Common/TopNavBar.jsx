import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TiMediaRecord } from "react-icons/ti";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Badge
} from "@material-tailwind/react";

export function TopNavBar() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  // const notifications = [
  //   { id: 1, content: "멍뭉이 NFT의 거래가 완료 되었습니다." },
  //   { id: 2, content: "거래완료2" },
  //   { id: 3, content: "거래완료3" }
  // ];

  const goToLanding = () => {
    navigate("/");
  };

  const goToWishlist = () => {
    navigate("/wishlist");
  };
  // 마켓플레이스(거래 목록 페이지)로 이동
  const goToTransaction = () => {
    navigate("/transaction");
  };

  // 도감 페이지로 이동
  const goToCollection = () => {
    navigate("/collections");
  };

  const createNFT = () => {
    navigate("/nft");
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  const goLogout = () => {
    window.location.href = "http://127.0.0.1:5000/api/users/logout";
    alert("로그아웃 되었습니다!");
  };

  const getNotifications = async () => {
    try {
      const response = await axios.get("/api/notifications", {
        params: {
          page: 0,
          size: 10
        }
      });
      console.log("알림 가져오기 성공", response);
      setNotifications(response.data.response.content);
    } catch (error) {
      console.log("알림 가져오기 실패", error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const handleShowNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // const deleteNotification = async (notification) => {
  //   const notificationId = notification.id;
  //   try {
  //     const response = await axios.delete(
  //       `/api/notifications/${notificationId}`
  //     );
  //     console.log("알림 삭제 완료", response);
  //   } catch (error) {
  //     console.log("알림 삭제 실패", error);
  //   }
  // };

  return (
    <>
      <div className="flex max-w-[1600px] w-[1440px] min-h-[80px] items-center justify-between pl-[24px] pr-[24.01px] py-[16px] absolute top-[2px] left-0">
        <div className="relative flex-1 grow h-[36px]">
          <img
            onClick={goToLanding}
            className="absolute w-[171px] h-[79px] top-[-22px] left-[4px] object-cover"
            src="/logo.png"
            alt="Link foundation logo"
          />
          <div className="inline-flex items-start justify-center left-[213px] absolute top-0">
            <button
              onClick={goToTransaction}
              className="h-[36px] items-center justify-center pl-[18.5px] pr-[18.3px] pt-[9px] pb-[8px] rounded-full inline-flex relative flex-[0_0_auto]"
            >
              <div className="relative w-fit mt-[-1.00px] text-[#000000b2] [font-family:'Pretendard-SemiBold',_Helvetica] font-semibold text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                마켓플레이스
              </div>
            </button>
            <button
              onClick={goToCollection}
              className="inline-flex h-[36px] items-center justify-center pt-[9px] pb-[8px] px-[24.14px] relative flex-[0_0_auto] rounded-full all-[unset] box-border"
            >
              <div className="relative w-fit mt-[-1.00px] text-[#000000b2] [font-family:'Pretendard-SemiBold',_Helvetica] font-semibold text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                도감
              </div>
            </button>
            <div className="relative flex-[0_0_auto] h-[36px] rounded-full" />
          </div>
        </div>
        <div className="flex items-center justify-center pl-[8.65px] pr-[8.68px] py-0 relative flex-1 grow">
          <div className="relative w-[500px] h-[48px] ml-[-26.67px] mr-[-26.67px]">
            <div className="relative h-[48px] rounded-full">
              {/* <div className="flex w-[500px] min-h-[48px] items-center pl-[48px] pr-[32px] py-px absolute top-0 left-0 bg-[#0000000d] rounded-full overflow-hidden">
                <div className="inline-flex flex-col items-start pl-0 pr-[330px] py-0 relative flex-[0_0_auto]">
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="relative">
          <Badge content={notifications.length}>
            <Button
              onClick={() => {
                getNotifications();
                handleShowNotifications();
              }}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
              </svg>
            </Button>
          </Badge>
          {showNotifications && (
            <div
              className="absolute top-[48px] left-[2px] bg-white p-4 rounded-lg shadow-md z-10"
              style={{
                width: "500px",
                maxWidth: "500px"
              }}
            >
              <ul style={{ color: "black" }}>
                {notifications.map((notification, index) => (
                  <li key={index} style={{ fontSize: "15px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "5px"
                      }}
                    >
                      <TiMediaRecord
                        style={{ marginRight: "0.5rem", fontSize: "15px" }}
                      ></TiMediaRecord>
                      등록하신 "{notification.postTitle}" 판매 글의 NFT가 판매
                      되었습니다.
                      {/* {notification.content} */}
                    </div>

                    {/* <Button
                      onClick={deleteNotification(notification)}
                      variant="outlined"
                      color="red"
                      // className="mt-4 text-blue-500 hover:underline"
                    >
                      삭제
                    </Button> */}
                    {index !== notifications.length - 1 && (
                      <hr className="border-t border-gray-300 my-2"></hr>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-[50px] h-[48px] relative flex-1 grow">
          <div className="flex">
            <button
              onClick={createNFT}
              className="absolute w-[154px] h-[48px] top-0 left-[131px] bg-[#f8f0f0] rounded-full shadow-[0px_4px_4px_#00000040] all-[unset] box-border"
            >
              <div className="relative w-[146px] h-[94px] top-[-18px] left-[-24px]">
                <div className="absolute h-[19px] top-[31px] left-[84px] [font-family:'Pretendard-SemiBold',_Helvetica] font-semibold text-black text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  NFT 생성
                </div>
                <img
                  src="/nftlogo.png"
                  className="absolute w-[34px] h-[32px] top-7 left-10"
                  alt="Video player"
                />
                {/* <img className="absolute w-[112px] h-[94px] top-0 left-0" alt="Video player" /> */}
              </div>
            </button>
            <Menu>
              <MenuHandler>
                <Button className="absolute w-[154px] h-[48px] top-0 left-[310px] bg-black rounded-full shadow-[0px_4px_4px_#00000040] all-[unset] box-border">
                  <div className="absolute h-[19px] top-[13px] left-[56px] text-white [font-family:'Pretendard-SemiBold',_Helvetica] font-semibold text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                    마이페이지
                  </div>
                  <img
                    src="/avatar.png"
                    className="absolute w-[33px] h-[33px] top-[7px] left-[10px] object-cover"
                    alt="Avatars avatar"
                  />
                </Button>
              </MenuHandler>
              <MenuList className="absolute top-0 left-0">
                <MenuItem onClick={goToMypage}>마이페이지</MenuItem>
                <MenuItem>Connect Wallet</MenuItem>
                <MenuItem onClick={goToWishlist}>위시리스트</MenuItem>
                <MenuItem onClick={goLogout}>로그아웃</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}
