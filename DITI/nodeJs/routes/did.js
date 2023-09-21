// const express = require('express');
// const router = express.Router();

// const EthrDID = require('ethr-did');
// const Resolver = require('did-resolver');
// const getResolver = require('ethr-did-resolver');
// const { createVerifiableCredentialJwt, createVerifiablePresentationJwt, verifyCredential, verifyPresentation } = require('did-jwt-vc');

import express from "express"
const router = express.Router()
import { EthrDID } from "ethr-did"
import { Resolver } from "did-resolver"
import { getResolver } from "ethr-did-resolver"
import { createVerifiableCredentialJwt, createVerifiablePresentationJwt, verifyCredential, verifyPresentation } from "did-jwt-vc"

// multipart 데이터를 받기 위해 사용 (신분증 사진)
import multer from 'multer'
const upload = multer()

// 메세지로 본인 인증하는 함수 작성한 것 import
import { verifyLoginMessage } from "../src/auth.js"

// ssafy 네트워크로 수정하기
const rpcUrl = 'https://rpc.sepolia.org/'

// issuer
// ssafy 네트워크에 배포한 스마트 컨트랙트 주소로 수정하기
const issuer = new EthrDID({
    identifier: '0xaaef0b23300e48A68eD859Dc8E102B1884b74bf0',
    privateKey: 'c530543a2e9f13415d72265f7e7ae0dca577f10ff3a68fd499e9c8db9aca4f73',
    rpcUrl: rpcUrl,
    chainNameOrId: 'sepolia',
})

// resolver
// see also https://github.com/decentralized-identity/ethr-did-resolver#multi-network-configuration
const providerConfig = {
    rpcUrl: rpcUrl,
    registry: '0xb4884e21e276a2d42b2969ae9ca220639d2abe73',
    name: 'sepolia'
}
const resolver = new Resolver(getResolver(providerConfig))


async function createVC(walletAddress, data) {
    // create VC
    const vcPayload = {
        // 유저 지갑 주소 기반으로 did 생성
        sub: 'did:ethr:sepolia:' + walletAddress,
        nbf: 1562950282,
        //    exp: 1646337778,
        vc: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            credentialSubject: {
                data,
            }
        }
    }
    let vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer)
    return vcJwt
}

// // verify VC
// try {
//     const verifiedVC = await verifyCredential(vcJwt, resolver)
//     console.log("################ verifiedVC ########################")
//     console.log(verifiedVC)
// } catch (e) {
//     console.log(e)
// }
// // process.exit(1)
// /vc 경로로 post 요청이 왔을 때의 로직
// https://inpa.tistory.com/entry/EXPRESS-%F0%9F%93%9A-multer-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4
router.post('/vc', upload.single("imgFile"), async (req, res) => {
    // body에는 텍스트 정보
    const { walletAddress, originalMessage, signedMessage } = req.body
    if (!verifyLoginMessage(walletAddress, originalMessage, signedMessage)) {
        res.status(400).send("login failed")
    }
    // OCR로 읽어들인 정보 처리 아래와 같이 진행하면 될듯  
    // console.log(req.file)
    // const img2text=readText(req.file)    
    // {"name":img2text.name, "personalID":img2text.id}
    const vcJwt = await createVC(walletAddress, { "name": "서지현", "IDnumber": "123456-1234567" })
    res.send(vcJwt)
})

router.get("/test", (req, res) => {
    res.send("hello")
})

export default router