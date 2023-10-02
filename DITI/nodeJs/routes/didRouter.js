import express from "express";
const router = express.Router();
// multipart 데이터를 받기 위해 사용 (신분증 사진)
import multer from "multer";
const upload = multer({ dest: "uploads/" });

// 메세지로 본인 인증하는 함수 작성한 것 import
import { verifyLoginMessage } from "../src/auth.js";

import { readImage } from "../src/ocr.js";
import { createVC, createVP } from "../src/did.js";
import axios from "axios";

// 테스트 코드
// router.get("/test", (req, res) => {
//     res.send("hello")
// })

// /vc 경로로 post 요청이 왔을 때의 로직
// https://inpa.tistory.com/entry/EXPRESS-%F0%9F%93%9A-multer-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4
router.post("/vc", upload.single("imgFile"), async (req, res) => {
  // body에는 텍스트 정보
  // const { walletAddress, originalMessage, signedMessage } = req.body
  // if (!verifyLoginMessage(walletAddress, originalMessage, signedMessage)) {
  //     res.status(400).send("login failed")
  // }
  const walletAddress = req.headers.walletaddress;

  // OCR로 읽어들인 정보 처리
  // console.log("log:",req.file)
  const ocrResult = await readImage(req.file);
  const vcJwt = await createVC(walletAddress, ocrResult);
  // 유저 테이블에 주소가 추가되는 것 (VC없이 지갑주소만 추가)
  try {
    const springJoin = await axios.post(
      process.env.SPRING_SERVER_URI + "/diti/auth/join",
      walletAddress,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  } catch (e) {
    if (e.response.status === 400) {
      // 이미 가입된 회원에 대해 400에러 처리를 하면,
      // 기존에 가입했던 회원이 vc삭제 후 다시 vc를 요청했을 때
      // 회원정보가 남아있기 때문에 발급이 안 되는 문제가 발생하기 때문에 에러처리X
    } else {
      console.log(e);
      console.log("/diti/auth/join failed");
      res.status(500).send("/diti/auth/join failed");
      return;
    }
  }
  // VC 테이블에 vcJwt 추가
  try {
    const springResponse = await axios.post(
      process.env.SPRING_SERVER_URI + "/diti/vc",
      {
        walletAddress: walletAddress,
        vcJwt: vcJwt,
        type: "idCard",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("DITI에서 VC 등록 성공");
  } catch {
    console.log("/diti/vc failed");
    // 등록되지 않은 회원일 경우 예외처리
    if (e.response.status == 404) {
      res.status(404).send("등록되지 않은 회원입니다. 예기치 않은 결과.");
      return;
    }
    // 이미 등록된 VC인 경우 예외처리
    else if (e.response.status == 400) {
      res.status(400).send("이미 등록된 VC입니다.");
      return;
    } else {
      res.status(500).send("unknown error");
      return;
    }
  }
  res.send(vcJwt);
});

// VP 발급
router.get("/vp/:walletAddress/:type", async (req, res) => {
  const walletAddress = req.params.walletAddress;
  const type = req.params.type;
  try {
    const springResponse = await axios.get(
      process.env.SPRING_SERVER_URI + "/diti/vc/" + walletAddress + "/" + type,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const vcJwt = springResponse.data.response.vcJwt;
    console.log("springResponse.data.response.vcJwt:", vcJwt);
    const vpJwt = await createVP(vcJwt);
    res.send(vpJwt);
  } catch {
    console.log("GET /diti/vc failed");
  }
});

export default router;
