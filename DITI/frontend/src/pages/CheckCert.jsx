import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import useUserInfoStore from '../stores/UserInfoStore.js'
import axios from "axios"
import { Buffer } from 'buffer';

export function CheckCert() {
    const [VcList, setVcList] = useState([]);
    const walletAddress = useUserInfoStore((state) => state.walletAddress)
    const [decodedJwts, setDecodedJwts] = useState([]);
    const userInfo = useUserInfoStore()

    // 조회 페이지 들어오면 vc 리스트 데이터 불러오기
    // 일회성
    useEffect(() => {
        // Jwt decode (payload 내용을 보여줘야 함)
        certList()
    }, [])

    function parseJwt(vcJwt) {
        return JSON.parse(
            Buffer.from(vcJwt.split('.')[1], 'base64').toString()
        );
    }
    async function certList() {
        try {
            const response = await axios.get(`/diti/vc/list/vc/${walletAddress}`, {
                headers: {
                    'Authorization': userInfo.token,
                    'walletAddress': userInfo.walletAddress,
                },
            })
            console.log(response)
            console.log("test:", response.data.response.content);
            setVcList(response.data.response.content)

            const decodedJwts = response.data.response.content.map(vc => parseJwt(vc.vcJwt));
            const infos = decodedJwts.map(payload => {
                const info = {
                    ...payload.vc.credentialSubject.data,
                    exp: payload.exp,
                    nbf: payload.nbf,
                    walletAddress: payload.sub.split(":").pop()
                }
                return info
            });
            setDecodedJwts(infos);

        } catch (e) {
            console.error(e)
        }
    }

    async function renewVC(type) {
        try {
            const response = await axios.put("/diti/did/vc",
                {
                    type: type
                },
                {
                    headers: {
                        'Authorization': userInfo.token,
                        'walletAddress': userInfo.walletAddress,
                    },
                })
            console.log(response)
            certList()
        } catch (e) {
            console.error(e.response.data)
        }
    }


    return (
        <div>
            {/* 신분증 종류에 따라서 여러 개 올 수 있음! 우리 프로젝트는 주민등록증만 만들어놓기는 했지만 개념상으로는 그럼 참고해주세욥 */}
            {/* <div className='m-10'>DID 인증서 리스트 조회</div> */}

            <div className='border-while border-solid border-4 m-3 max-w-xl mx-auto'>
                <div className='m-10'>
                    {VcList ? (
                        VcList.map((vc, index) => (
                            <div key={index}>
                                <div> 신분증 : {decodedJwts[index].idName}</div>
                                <div> 이름 : {decodedJwts[index].name}</div>
                                <div> 고유번호 : {decodedJwts[index].pin}</div>
                                <div> 성별 : {decodedJwts[index].gender}</div>
                                <div> 생년월일 : {decodedJwts[index].birth}</div>
                                <div> 발급일자 : {new Date(decodedJwts[index].nbf * 1000).toLocaleString()}</div>
                                <div> 만료일자 : {new Date(decodedJwts[index].exp * 1000).toLocaleString()}</div>
                                <div> 지갑주소 : {decodedJwts[index].walletAddress}</div>
                                <Button
                                    className="text-md h-30 m-3"
                                    onClick={() => renewVC(vc.type)}
                                >
                                    전자 신분증 갱신
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>

        </div>
    );
}