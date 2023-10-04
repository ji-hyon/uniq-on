import { Card, CardHeader, CardBody, Typography, CardFooter, Button } from "@material-tailwind/react";
import axios from "axios"
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode"
   
  export function UserIdCard({onConfirm}) {
    const [userInfo, setUserInfo] = useState({});

    // 유저 정보 불러오기
    useEffect(() => {
        async function getuserInfo() {
          try {
            const response = await axios.get(`/api/myPage/info`);
            if (response.status === 200) {
            console.log(response.data.response);
              // setUserInfo(response.data.response);
              const vpPayload=jwtDecode(response.data.response.vpToken)
              const vcPayload=jwtDecode(vpPayload.vp.verifiableCredential[0])
              const userData={
                ...vcPayload.vc.credentialSubject.data,
                nbf:vcPayload.nbf,
                exp:vcPayload.exp,
                walletAddress:vcPayload.sub.split(":").pop(),
                nickname:response.data.response.nickname,
              }
              console.log(userData)
              setUserInfo(userData)
            } else {
              console.log(response);
            }
          } catch (error) {
            console.log("실패", error);
          }
        }
        getuserInfo();
      }, []);

    return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Card
        shadow={false}
        className="relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
        
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
        >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>

        <CardBody className="relative py-14 px-6 md:px-12">
        
        <Typography variant="h5" className="mb-4 text-blue-400">
        {userInfo.nickname}
        </Typography>
        <img src="/userIcon.png"  className="mx-auto w-1/5" alt="User Icon" /> 

        <div>
            <div>{userInfo.name}</div>
            <div>{userInfo.gender}</div>
            <div>{userInfo.birth}</div>
            <div>{userInfo.walletAddress}</div>
            {/* <div>{userInfo.nbf}</div>  */}
            <div>{new Date(userInfo.nbf*1000).toLocaleString()}</div>
            {/* <div>{userInfo.exp}</div>  */}
            <div>{new Date(userInfo.exp*1000).toLocaleString()}</div>
        </div>

        <CardFooter className="pt-3">
            <Button size="lg" color="blue" fullWidth={true} onClick={onConfirm}>
                확인
            </Button>
         </CardFooter>

        </CardBody>

      </Card>
    </div>
    );
  }