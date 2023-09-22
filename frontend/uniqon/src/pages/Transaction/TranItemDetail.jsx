import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ItemDetailCard } from "../../components/Common/ItemDetailCard";
import { TopNavBar } from "../../components/Common/TopNavBar";
import { useState } from "react";
import { Button } from "@material-tailwind/react";


export function TranItemDetail () {

  const nftImg = React.useRef(null);

  const navigate = useNavigate();

  const { id } = useParams();
  const [ item, setItem ] = useState({});
  const URL = "http://localhost:5000"

  // const [수정open, set수정Open] = React.useState(false);
  // const 수정handleOpen = () => { set수정Open(!수정open); };
  // const [수정할NFTid, set수정할NFTid] = useState("");

  function goToTransaction() {
    navigate("/transaction");
  }


  useEffect(() => {
    axios.get(URL + `/api/sales/detail/${id}`)
    .then((res) => {
      setItem(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [id]);

  async function updateSales() {

    try {
    const data = {
        price: 1000,
      };

      const formData = new FormData()
      formData.append("data", new Blob([JSON.stringify(data)], {type: "application/json"}))
      formData.append("file", nftImg.current.files[0])

      const res = await axios.put(URL + "/api/sales/update/1", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  
          },
          file: nftImg.current.files[0],
      });
        console.log(res.data)

    } catch(err) {
      console.log(err)
    }
  }

  async function deleteSales() {

    try {
      const res = await axios.delete(URL + `/api/sales/delete/${id}`);
        console.log(res.data)
        goToTransaction();


    } catch(err) {
      console.log(err)
    }
  }
  

  return (
    <div className="App">
      
      
    <header className="App-header">
    <div className="flex flex-row justify-center w-full bg-white">
      <div className="bg-white w-[1440px] h-[1024px] relative">
          <TopNavBar />
          <div className="relative top-28">
          {item ? (
                <ItemDetailCard item={item} />
                
              ) : (
                <p>Loading...</p>
              )}
              <Button color="blue" onClick={updateSales}>판매 수정</Button>
        <br></br>
        <Button color="cyan" onClick={deleteSales}>판매 삭제</Button>
        <br></br>
          </div>
          {/* <Button onClick={수정handleOpen} variant="gradient" className="self-end">
        판매글 수정
      </Button>
      <Dialog
        size="xs"
        open={수정open}
        handler={수정handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              판매글 수정
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="판매 NFT 선택" value={수정할NFTit} size="lg" onChange={(e) => set수정할NFTid(e.target.value)}/>
            <Input label="판매글 제목" value={title} size="lg" onChange={(e) => setTitle(e.target.value)} />
            <Input label="판매글 내용" value={content} size="lg" onChange={(e) => setContent(e.target.value)}/>
            <Input label="판매 가격" value={price} size="lg" onChange={(e) => setPrice(e.target.value)}/>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={() => {수정handleOpen(); updateSales(title, content, price)}} fullWidth>
              등록
            </Button>
          </CardFooter>
        </Card>
      </Dialog> */}
      
        
        </div>
          
      </div>
      
        </header>
        
      </div>
  )
};