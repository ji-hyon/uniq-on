import { Button } from "@material-tailwind/react";
import axios from "axios"

export function Collections() {
  axios.defaults.baseURL = "http://localhost:8080";

  async function getList() {
    try {
      const response = await axios.get("/collections/list")
      // const response = await axios.get("http://localhost:8080/collections/list")
      console.log("success: ", response);
    }catch(e) {
      console.log("failed: ", e);
    }
  }

  async function deleteItem() {
    try {
      const response = await axios.delete("/collections/0")
      console.log("success: ", response);
    }catch(e) {
      console.log("failed: ", e);
    }
  }

  // delete 다른 형식으로 작성한 코드
  // axios.delete("/collections/0")
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  //   .then(function () {
  //     // always executed
  //   });

  async function addItem() {
    try {
      // 요청을 보낼 데이터
      const data = {
        species: '종부류',
        name: '생물명',
        image: '이미지 URL',
      };

      const response = await axios.post("/collections/register", data, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      console.log("success: ", response);
    } catch (e) {
      console.log("failed: ", e);
    }
  }

  async function editItem() {
    try {
      // 수정할 데이터
      const data = {
        id: 1, 
        species: '새로운 종부류',
        name: '새로운 생물명',
        image: '새로운 이미지 URL',
      };

      const response = await axios.put("/collections/info", data, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      console.log("success: ", response);
    } catch (e) {
      console.log("failed: ", e);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Collections
        </p>

        {/* 등록 버튼 */}
        <Button
          className="text-3xl w-70 h-30 m-5"
          onClick={addItem}
          color="blue"
          >
          등록
        </Button>

          {/* 도감 리스트 조회 버튼 */}
          <Button
          className="text-3xl w-70 h-30 m-5"
          onClick={getList}
          color="blue"
          >
          도감 리스트 조회
        </Button>

          {/* 수정 버튼 */}
          <Button
          className="text-3xl w-70 h-30 m-5"
          onClick={editItem}
          color="blue"
          >
          수정
        </Button>

          {/* 삭제 버튼 */}
          <Button
          className="text-3xl w-70 h-30 m-5"
          onClick={deleteItem}
          color="blue"
          >
          삭제
        </Button>


      </header>
    </div>
  );
}