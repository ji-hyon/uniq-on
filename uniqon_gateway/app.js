import express from "express";
import bodyParser from "body-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import { verifyPresentation } from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors()); // cors 설정
app.use(bodyParser.json()); // json 응답 설정
app.use(bodyParser.urlencoded({ extended: true }));

// 프로바이더 설정
const providerConfig = {
  // 사용한 블록체인 네트워크
  rpcUrl: process.env.BC_NETWORK,
  // DID 배포한 스마트 컨트랙트 주소
  registry: process.env.BC_SMART_CONTRACT_ADDRESS,
  // 사용한 블록체인 네트워크 이름
  name: process.env.BC_NETWORK_NAME,
};

// 기본 포트 설정
app.listen(process.env.PORT, () => {
  console.log(`Server Start on port [${process.env.PORT}] !!`);
});

// VP 검증 함수
async function verifyVP(vpJwt) {
  try {
    // Resolver : did documnet 가져오는 역할
    const resolver = new Resolver(getResolver(providerConfig));
    // vp 검증
    const result = await verifyPresentation(vpJwt, resolver);
    // 결과가 있고, 유효하면
    if (result && result.verified) {
      // vp배열 안 vc들 하나씩 검증  
      const vcs = result.payload.vp.verifyCredential.map(async vcJwt => {
        try {
          const vcJwtResolved = await verifyCredential(vcJwt, resolver)
          if (vcJwtResolved && vcJwtResolved.verified) {
            // ocr로 읽은 정보들이 들어있는 부분 배열에 담기
            return vcJwtResolved.payload.vc.credentialSubject
          } else {
            throw new Error("verify VC failed")
          }
        } catch (e) {
          throw e
        }
      })
      return vcs
    } else {
      throw new Error("verify VP failed")
    }
  } catch (e) {
    throw (e)
  }
}

// VP 검증 URI
app.post("/api/verifyVP", async (req, res) => {
  console.log("# VP 검증 요청 ..");
  const vpJwt = req.body.vpJwt;
  console.log(vpJwt);
  if (vpJwt) {
    try {
      const resolver = new Resolver(getResolver(providerConfig));
      const result = await verifyPresentation(vpJwt, resolver);
      if (result && result.verified) {
        res.sendStatus(200);
        console.log("검증 완료");
      } else {
        console.log("검증 실패");
        res.sendStatus(401);
      }
    } catch (error) {
      console.error("검증 중 에러 발생:", error);
      res.sendStatus(500);
    }
  } else {
    console.log("잘못된 요청");
    res.sendStatus(400);
  }
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception 발생:", error);
});


// 회원가입 요청 api
app.post("/api/users/signup", async (req, res) => {
  try {
    // DITI에 vp 요청
    const ditiResponse = await axios.get(process.env.DITI_SERVER_URL+"/diti/did/vp/" + req.headers.walletaddress + "/idCard", {
      headers: {
        'Content-Type': 'application/json',
        'walletAddress': req.headers.walletaddress,
        'Authorization': req.headers.authorization,
      }
    })
    const vpJwt = ditiResponse.data
    // 유효한 vp인지 검증
    const vcs = verifyVP(vpJwt)
    if (vcs.length == 0) {
      res.status(400).send("no VC")
    }

    // vp안의 여러 vc들 중 첫 번째 vc만 검증 (프로젝트에서 vc하나만 담도록 설계했기 때문)
    const data = {
      "walletAddress": req.headers.walletaddress,
      "name": vcs[0].data.idName,
      "nickname": "nonickname",
      "birth": vcs[0].data.birth,
      "gender": vcs[0].data.gender,
      "vpToken": vpJwt,
      // password는 지갑주소 마지막 20자리로 설정함
      "password": req.headers.walletaddress.slice(-20)
    }
    const formData = new FormData()
    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }))
    // file이 null값일 때 에러나는지 체크할 용도
    formData.append("file", null)

    // 스프링 서버에 회원가입 요청
    axios.post(process.env.SPRING_SERVER_URL + "/api/users/signup",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      },
    )

  } catch (e) {
    res.status(500).send("GET /diti/did/vp/" + req.headers.walletaddress + "/idCard failed")
    return
  }

})

// 스프링 서버 세팅
const springProxy = createProxyMiddleware({
  target: process.env.SPRING_SERVER_URI,
  changeOrigin: true,
});

// 프록시 세팅
// app.use("/api", springProxy);
app.use(springProxy);
