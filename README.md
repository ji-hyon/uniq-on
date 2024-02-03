<div align="center">

# Uniqon
<img src="img/uniqon/main.png" width="70%" />
</div><br>

## 📚 서비스 소개
- AI를 기반으로 자신이 소유한 희귀동물의 이미지를 생성할 수 있고, 이를 <b>NFT(Non-Fungible Token)로 발행</b>할 수 있습니다.
- 발행된 희귀동물 NFT 목록을 검색/조회할 수 있고, 이더리움을 통해 <b>NFT를 거래</b>할 수 있습니다.
- 도감을 통해 각 <b>희귀동물에 대한 상세한 정보</b>를 얻을 수 있습니다. 
- 인증기관(DITI)에서 Metamask로 로그인할 수 있고, <b>블록체인 기반 DID(탈중앙화 신원증명)를 바탕으로 신원 인증서를 발급</b>받을 수 있습니다.
- 인증기관(DITI)에서 발급된 <b>인증서를 기반으로 간편 로그인</b>이 가능합니다. 
<br>

## 🗓 개발 기간
- 2023.08.23 ~ 2023.10.06 (6주)
<br>

## 👨‍👨‍👦 팀 구성 
<table align="center">
    <tr align="center">
        <td><a href="https://github.com/JeBread">
            <img src="https://avatars.githubusercontent.com/u/108921478?v=4" width="100px" height="100px" alt="JeBread"/><br />
            <sub><b>방상제</b></sub></a>
            <br/> Frontend 
            <br/> <br/>
        </td>
        <td><a href="https://github.com/cjjss11">
            <img src="https://avatars.githubusercontent.com/u/122518199?v=4" width="100px" height="100px"alt="cjjss11"/><br />
            <sub><b>최지수</b></sub></a>
            <br /> Frontend  
            <br/> <br/>
        </td>
        <td><a href="https://github.com/szihyon">
            <img src="https://avatars.githubusercontent.com/u/120673992?v=4" width="100px" height="100px" alt="szihyon"/><br />
            <sub><b>서지현</b></sub></a>  
            <br /> BlockChain
            <br/> CI/CD
        </td>
        <td><a href="https://github.com/kmr5326">
            <img src="https://avatars.githubusercontent.com/u/50177492?v=4" width="100px" height="100px" alt="kmr5326"/><br />
            <sub><b>김한결</b></sub></a>
            <br /> BlockChain
            <br/> CI/CD
        </td>
        <td><a href="https://github.com/asdqwe45">
            <img src="https://avatars.githubusercontent.com/u/118823358?v=4" width="100px" height="100px" alt="asdqwe45"/><br />
            <sub><b>이재명</b></sub></a>
            <br /> Backend
            <br/> AI
        </td>
        <td><a href="https://github.com/cutepassion">
            <img src="https://avatars.githubusercontent.com/u/105566077?v=4" width="100px" height="100px" alt="cutepassion"/><br />
            <sub><b>진병욱</b></sub></a>
            <br /> Backend 
            <br/> <br/>
        </td>
    </tr>
</table>
<br>

## 🔎 기능소개

#### (1) DITI (Decentralized Identity Trust Infrastructure) - 블록체인 기반 신원 인증 서비스

|1. 메인화면 + 로그인 |2. VC 발급|3. VC 조회|
|:---:|:---:|:---:|
|![proc1-2](img/diti/main_fill.png)|![proc1-3](img/diti/vc_fill.png)|![proc1-3](img/diti/get_vc_fill.png)|

#### (2) UNIQON (UNIQUE + ON) - NFT 거래 서비스

|1. 로그인|2. 회원가입|
|:---:|:---:|
|![proc1-3](img/uniqon/login-fill3.png)|![proc1-3](img/uniqon/signup-fill3.png)|

|4. NFT 발급|5. NFT 거래 목록|
|:---:|:---:|
|![proc1-2](img/uniqon/nft-fill.png)|![proc1-3](img/uniqon/post_list_fill.png)|

|6. NFT 거래|7. 도감|
|:---:|:---:|
|![proc1-2](img/uniqon/transaction_fill.png)|![proc1-3](img/uniqon/collection_fill.png)|
<br>

## ⚙ 시스템 아키텍처 
<div align="center">
    <img src="img/architecture.png" width="70%"/>
</div>
<br>


## 🛠 사용 기술 및 라이브러리

### Block-Chain
```
Express.js
Metamask
ethers [6.7.1]
web3_token [1.0.6]
```
### Front-End
```
react [18.2.0]
zustand [4.4.1]
tailwindcss [3.3.3]
three.js [0.154.0]
```
### Back-End
```
Java [17]
springboot [3.1.3]
springsecurity [3.1.3]
JPA [3.1.4]
mysql [8.0.33]
swagger [2.2.0]
```
