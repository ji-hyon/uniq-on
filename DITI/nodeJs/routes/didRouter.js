import express from "express"
const router = express.Router()
// multipart 데이터를 받기 위해 사용 (신분증 사진)
import multer from 'multer'
const upload = multer({ dest: 'uploads/'})

// 메세지로 본인 인증하는 함수 작성한 것 import
import { verifyLoginMessage } from "../src/auth.js"

import { readImage } from "../src/ocr.js"

// /vc 경로로 post 요청이 왔을 때의 로직
// https://inpa.tistory.com/entry/EXPRESS-%F0%9F%93%9A-multer-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4
router.post('/vc', upload.single("imgFile"), async (req, res) => {
    // body에는 텍스트 정보
    const { walletAddress, originalMessage, signedMessage } = req.body
    if (!verifyLoginMessage(walletAddress, originalMessage, signedMessage)) {
        res.status(400).send("login failed")
    }

    // OCR로 읽어들인 정보 처리 아래와 같이 진행하면 될듯  
    // console.log("log:",req.file)
    const ocrResult=await readImage(req.file)
    const vcJwt = await createVC(walletAddress, ocrResult)
    res.send(vcJwt)
})

router.get("/test", (req, res) => {
    res.send("hello")
})

export default router