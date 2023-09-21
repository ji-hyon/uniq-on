import express from "express";
import bodyParser from "body-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { requestWithFile } from "./naverOcr.js";
import { verifyJWT, getDidDocument } from "./middleware.js";
import ethereumUtil from "ethereumjs-util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 업로드 파일 이름 및 경로 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 파일이 저장될 디렉토리 설정
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname); // 파일 확장자 추출
    const filename = `${file.fieldname}-${Date.now()}${extname}`; // 새 파일 이름 생성
    cb(null, filename);
  },
});
// 업로드 설정
const upload = multer({ storage: storage });

// 서버 default port 지정
app.listen(process.env.PORT, () => {
  console.log(`Server Start on port [${process.env.PORT}] !!`);
});

// 로그인
app.post("/api/login", (req, res) => {
  // 로그인 로직
  const privateKey = req.body["private-key"];
  const pubToAddress = ethereumUtil.privateToAddress(ethereumUtil.toBuffer("0x" + privateKey));
  const address = Buffer.from(pubToAddress).toString("hex");
  getDidDocument(address, privateKey)
    .then((res) => {
      console.log(res);
      console.log(res.didDocument.verificationMethod);
      const didDocument = res.didDocument.id();
      console.log("did 주소 " + didDocument);
    })
    .catch((err) => {
      console.log(err);
    });
});

// 회원가입
app.post("/api/signup", upload.single("fileUpload"), (req, res) => {
  // 파일 업로드 x
  if (!req.file) {
    return res.status(400).send("파일을 선택해주세요");
  }
  requestWithFile(req.file)
    .then((data) => {
      if (data.images[0].inferResult === "SUCCESS") {
        const res = data.images[0].fields;
        let gender = "";
        if (res[2].inferText.split("-")[1][0] === "1" || res[2].inferText.split("-")[1][0] === "3") {
          gender = "남성";
        } else {
          gender = "여성";
        }
        let birthYear = "";
        if (res[2].inferText.split("-")[1][0] === "3" || res[2].inferText.split("-")[1][0] === "4") {
          birthYear = "20" + res[2].inferText.slice(0, 2);
        } else {
          birthYear = "19" + res[2].inferText.slice(0, 2);
        }

        const authId = {
          idName: res[0].inferText,
          name: res[1].inferText.split("(")[0],
          pin: res[2].inferText,
          gender: gender,
          birth: birthYear + "." + res[2].inferText.slice(2, 4) + "." + res[2].inferText.slice(4, 6),
        };

        console.log(authId);
        res.json({ message: data.images[0].fields });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(400).send("잘못된 요청입니다.");
    });
});

// // 미들웨어 설정
// app.use("/api", verifyJWT);
// // spring proxy 설정
// const springProxy = createProxyMiddleware({
//   target: process.env.SPRING_SERVER_URI,
//   changeOrigin: true,
// });

// spring proxy 설정
app.use("/api", springProxy);
