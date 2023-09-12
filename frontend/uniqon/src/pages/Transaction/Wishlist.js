import React from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";

import { useEffect } from "react";

export function Wishlist() {

  const URL = "http://localhost:8080"

  // useEffect(() => {
  //   getDefaultWishlist();
  // }, []);


  // function getDefaultWishlist() {
      
  //     axios
  //       .get("/api/wishlist/1")
  //       .then((res) => {
  //         console.log(res.data)
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  function getWishlist() {
      
      axios
        .get(URL + "/api/wishlist/")
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }

  function addWishlist() {
      
      axios
        .post(URL + "/api/wishlist/add/1")
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }

  function deleteWishlist() {
      
      axios
        .delete(URL + "/api/wishlist/1")
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Wishlist
        </p>
        <Button onClick={getWishlist}>getWishlist</Button>
        <Button onClick={addWishlist}>addWishlist</Button>
        <Button onClick={deleteWishlist}>deleteWishlist</Button>
      </header>
    </div>
  );
}