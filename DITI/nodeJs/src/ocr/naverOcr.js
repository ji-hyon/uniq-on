import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

/**
 * 네이버 OCR API
 * @param {*} image 이미지 객체
 * @returns 결과에 따른 데이터 혹은 오류 리턴
 */
export function requestWithFile(image) {
  return new Promise((resolve, reject) => {
    // filestream 으로 생성
    const file = fs.createReadStream(image.path);
    const message = {
      images: [
        {
          format: image.mimetype.split("/")[1],
          name: image.filename,
        },
      ],
      requestId: "",
      timestamp: 0,
      version: "V2",
    };
    const formData = new FormData();

    formData.append("file", file);
    formData.append("message", JSON.stringify(message));

    // API Gateway로 요청
    axios
      .post(process.env.NAVER_API_GATEWAY, formData, {
        headers: {
          "X-OCR-SECRET": process.env.NAVER_OCR_API_KEY,
          ...formData.getHeaders(),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`Request failed with status ${res.status}`));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
