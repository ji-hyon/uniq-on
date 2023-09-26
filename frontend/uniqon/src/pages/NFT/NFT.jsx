import { Button, Card, CardHeader, CardBody, CardFooter, Typography, Tooltip } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { TopNavBar } from '../../components/Common/TopNavBar';
import { Select, Option, Input, Textarea } from '@material-tailwind/react';

export function NFT() {
  const nftImg = useRef(null);
  const [name, setName] = useState('');
  const [middleType, setMiddleType] = useState('');
  const [age, setAge] = useState(0);
  const [feature, setFeature] = useState('');

  const [selectedMain, setSelectedMain] = useState('');
  const [selectedMiddle, setSelectedMiddle] = useState('');

  const mainOptions = ['여우', '도마뱀', '거북이', '앵무새', '물고기', '뱀', '카멜레온', '기타'];
  const middleOptions = {
    여우: ['벵골여우', '아프간여우', '케이프여우', '코사크여우', '티베트모래여우', '키트여우', '스위프트여우', '그 외'],
    도마뱀: [
      '비어디드래곤 도마뱀',
      '레오파드게코 도마뱀',
      '턱수염도마뱀',
      '표범도마뱀붙이',
      '토카이게코 도마뱀',
      '액키즈드워프 도마뱀',
      '러프납테일게코 도마뱀',
      '그 외'
    ],
    거북이: [
      '쟁기거북',
      '붉은귀거북',
      '아프리카 사이드넥 거북',
      '동부상자거북',
      '서양거북',
      '미시시피지도거북',
      '커먼 머스크 터틀',
      '점박이 거북',
      '노란배 슬러이더',
      '그 외'
    ],
    앵무새: [
      '금강앵무',
      '썬코뉴어',
      '왕관앵무',
      '모란앵무',
      '검은머리카이큐',
      '오색앵무',
      '유황앵무',
      '청금강',
      '사랑앵무',
      '코뉴어',
      '그 외'
    ],
    물고기: [
      '구피',
      '네온테트라',
      '제브라다니오',
      '베타',
      '플라워혼',
      '알지이터',
      '라미레지',
      '브리카르디',
      '플래티',
      '그 외'
    ],
    뱀: ['킹코브라', '콘 스네이크(옥수수뱀)', '밀크스네이크', '킹 스네이크', '볼파이톤', '그 외'],
    카멜레온: [
      '베일드 카멜레온',
      '피그미 카멜레온',
      '팬서 카멜레온',
      '파슨 카멜레온',
      '세네갈 카멜레온',
      '잭슨 카멜레온 표범 카멜레온',
      '그 외'
    ],
    기타: ['그 외']
  };

  // 대분류 값 변경
  const mainChange = (selectedMain) => {
    setSelectedMain(selectedMain);
  };

  // 중분류 값 변경
  const middleChange = () => {
    setSelectedMiddle(selectedMiddle);
  };

  useEffect(() => {
    setSelectedMiddle('');
  }, [selectedMain]);

  // nft 등록
  async function nftAdd() {
    try {
      // 요청을 보낼 데이터
      const data = {
        walletAddress: 'string',
        middleClassificationId: selectedMiddle,
        nftAddress: 'string',
        name: name,
        feature: feature,
        age: age
      };

      const formData = new FormData();
      formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      formData.append('file', nftImg.current.files[0]);

      const response = await axios.post('/api/nfts/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        // 파일 직접 넣기
        file: nftImg.current.files[0]
      });

      console.log('success: ', response);
    } catch (e) {
      console.log('failed: ', e);
    }
  }

  // nft 조회
  async function nftInfo() {
    try {
      const response = await axios.get('/api/nfts/0');
      console.log('success: ', response);
    } catch (e) {
      console.log('failed: ', e);
    }
  }

  // nft 삭제
  async function nftDelete() {
    try {
      const response = await axios.delete('/api/nfts/0');
      console.log('success: ', response);
    } catch (e) {
      console.log('failed: ', e);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-row justify-center w-full bg-white">
          <div className="bg-white w-[1440px] h-[1024px] relative">
            <TopNavBar />

            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex flex-row items-center space-y-6 md:space-y-0 md:space-x-20">
                <Card className="w-96">
                  <CardHeader floated={false} className="">
                    <span className="flex justify-center">
                      <lord-icon
                        src="https://cdn.lordicon.com/qfbuijil.json"
                        trigger="hover"
                        colors="outline:#121331,primary:#f24c00,secondary:#2ca58d,tertiary:#ebe6ef"
                        style={{ width: '150px', height: '150px' }}
                      />
                      <lord-icon
                        src="https://cdn.lordicon.com/emzrtjck.json"
                        trigger="hover"
                        colors="outline:#121331,primary:#08a88a"
                        style={{ width: '150px', height: '150px' }}
                      />
                    </span>
                  </CardHeader>
                  <CardBody className="text-center">
                    <span>
                      <input type="file" ref={nftImg} />
                      <Button className="m-5 text-3xl w-70 h-30" onClick={nftAdd} color="blue">
                        NFT 발급
                        <lord-icon
                          src="https://cdn.lordicon.com/ejxwvtlg.json"
                          trigger="hover"
                          colors="outline:#121331,primary:#08a88a,secondary:#ebe6ef"
                          style={{ width: '250px', height: '250px' }}
                        ></lord-icon>
                      </Button>
                    </span>
                  </CardBody>
                </Card>

                <div className="flex w-96 flex-col gap-20">
                  <Select variant="standard" label="대분류" onChange={mainChange} value={selectedMain}>
                    {mainOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                    {/* <Option>여우</Option>
                    <Option>도마뱀</Option>
                    <Option>거북이</Option>
                    <Option>앵무새</Option>
                    <Option>물고기</Option>
                    <Option>뱀</Option>
                    <Option>카멜레온</Option>
                    <Option>그 외</Option> */}
                  </Select>
                  {/* {selectedMain && ( */}
                  <Select variant="standard" label="중분류" onChange={middleChange} value={selectedMiddle}>
                    {selectedMain &&
                      middleOptions[selectedMain].map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    {/* <Option>여우</Option>
                    <Option>도마뱀</Option>
                    <Option>거북이</Option>
                    <Option>앵무새</Option> */}
                  </Select>
                  {/* )} */}
                  <Input variant="standard" label="이름" onChange={(e) => setName(e.target.value)} />
                  <Input variant="standard" label="나이" onChange={(e) => setAge(e.target.value)} />
                  <Textarea label="특징" onChange={(e) => setFeature(e.target)} />
                </div>
              </div>
            </div>

            {/* NFT 조회 버튼 */}
            {/* <Button
            className="m-5 text-3xl w-70 h-30"
            onClick={nftInfo}
            color="blue"
            >
            NFT 조회
          </Button> */}

            {/* NFT 삭제 버튼 */}
            {/* <Button
            className="m-5 text-3xl w-70 h-30"
            onClick={nftDelete}
            color="blue"
            >
            NFT 삭제 
          </Button> */}
          </div>
        </div>
      </header>
    </div>
  );
}
