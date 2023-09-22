import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@material-tailwind/react";
import axios from "axios"
import { ethers } from "ethers"

export function IssueCert() {
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [wallet, setWallet] = useState({
    address: "", 
    balance: "", 
    chainId: "",
  })
  const inputFileRef = useRef(null)

  useEffect(()=>{
    //connectMetaMask()
  },[])

  function detectMetaMask() {
    let injectedProvider = false
    if (typeof window.ethereum !== 'undefined') {
      // 프로바이더가 존재
      injectedProvider = true
      console.log(window.ethereum)
    }
    // 메타마스크인지 확인 (메타마스크면 window.ethereum.isMetaMask값이 true로 저장돼있음)
    const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false
    return isMetaMask
  }
  async function addStgGeth() {
    const response = await window.ethereum.request({
      "method": "wallet_addEthereumChain",
      "params": [
        {
          "chainId": "0x79F5",
          "chainName": "SSAFY",
          "rpcUrls": [
            "https://rpc.ssafy-blockchain.com"
          ],
          "iconUrls": [
            "https://xdaichain.com/fake/example/url/xdai.svg",
            "https://xdaichain.com/fake/example/url/xdai.png"
          ],
          "nativeCurrency": {
            "name": "ETH",
            "symbol": "ETH",
            "decimals": 18
          },
          "blockExplorerUrls": [
            "https://blockscout-geth.ssafy-blockchain.com/"
          ]
        }
      ]
    });
    console.log("addStgGeth:", response)
  }

  async function connectMetaMask() {
    // 메타마스크 확장 프로그램이 없으면 에러 발생
    if (!detectMetaMask()) {
      console.error("MetaMask is not installed")
      // 메타마스크 설치 메세지 및 홈페이지 이동 
      alert('MetaMask를 설치해주세요');
      window.location.href = 'https://metamask.io/';
      return
    }
    console.log("MetaMask exists")
    // 현재 체인ID를 가져와서 1378(ssafy 네트워크. 16진법으로 0x562)인지 아닌지 체크
    // https://docs.metamask.io/wallet/reference/eth_chainid/
    const currentChainId = await window.ethereum.request({
      "method": "eth_chainId",
      "params": []
    });
    // 현재 체인ID가 1378이 아니면 1378(0x562, 16진법)을 더해주는 것 --> 31221로 변경 필요!! (79F5)
    // add와 switch가 있는데, add는 없으면 추가한 다음 switch를 하고, switch는 없으면 에러 발생 -> add 사용
    // switch : https://docs.metamask.io/wallet/reference/wallet_switchethereumchain/
    // add : https://docs.metamask.io/wallet/reference/wallet_addethereumchain/
    if (currentChainId !== "0x79F5") {
      await addStgGeth()
    }

    // injectedProvider에 대한 객체 생성(?)
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider)
    // It will prompt user for account connections if it isnt connected
    // signer -> 현재 account 정보를 담고 있음
    try{
      const signer = await provider.getSigner();
      setSigner(signer)
      const address = await signer.getAddress()
      const balance = await provider.getBalance(address)
      const chainId = (await provider.getNetwork()).chainId
      setWallet({
        address: address, 
        balance: String(balance), 
        chainId: String(chainId),
      })
      console.log(address,balance,chainId)
  
    }catch(e){
      console.log("code:",e.code,"message:",e.message)
    }
  }

  async function requestVC() {
    // 백엔드 서버에 이 주소로 로그인하겠다는 것을 알려야 함. 신원 증명 필요. 
    // private key를 가지고 있고 서명을 만들 수 있다는 것을 증명
    // 임의의 메세지에 사인하는 것
    const message = "Please issue a certificate"
    const signedMessage = await signer.signMessage(message)
    // 백엔드 서버로, message와 signed message와 자신의 지갑 주소를 보내고, 백엔드에서 verifyMessage를 호출해서 나온 값이 자신의 주소와 일치해야 함 

    const data = {
      "walletAddress": await signer.getAddress(),
      "originalMessage": message,
      "signedMessage": signedMessage,
    };
    const formData = new FormData()
    //formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }))
    formData.append("walletAddress", data["walletAddress"])
    formData.append("originalMessage", data["originalMessage"])
    formData.append("signedMessage", data["signedMessage"])
    formData.append("imgFile", inputFileRef.current.files[0])

    try {
      const response = await axios.post("/api/did/vc", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response)
    } catch (e) {
      console.error(e)
    }
  }
  async function test() {
    try {
      const response = await axios.get("/api/did/test");
      console.log(response)
    } catch (e) {
      console.error(e)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className='border-while border-solid border-4 m-3'>
            <Button className="text-4xl w-96 h-28 m-5" color="orange" onClick={connectMetaMask}>MetaMask 연결</Button>
            {/* <ul style={{ borderStyle: "solid", borderWidth:"5px", borderColor : "white" }}> */}
            {/* <div className="text-2xl border-while p-5 m-7 border-solid border-4"> */}
            <div className="text-2xl container m-5">
              <div>VC Payload</div>
              <div>Address:{wallet.address}</div>
              <div>Balance:{wallet.balance}</div>
              <div>ChainID:{wallet.chainId}</div>
            </div>
          </div>
        </div>

        {/* <div style={{ borderStyle:"solid", borderWidth:"2px" }} > */}
        <div className='border-while border-solid border-4 m-3 p-5'>
          <input className="text-[20px] text-center" ref={inputFileRef} type="file" name="imgFile" />
          <Button className="text-4xl w-96 h-28 mt-1" color="yellow" onClick={requestVC}>전자신분증 발급</Button>
        </div>
        
          <Button className="text-base w-50 h-20 m-20" color="blue" onClick={test}>node connect test</Button>
      </header>

    </div>
  );
}