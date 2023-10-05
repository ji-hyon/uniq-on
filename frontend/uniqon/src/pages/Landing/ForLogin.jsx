import React from 'react';
import Scene from '../../components/Landing/Scene';
import { CheckoutForm } from "../../components/Common/CheckoutForm";

export function ForLogin() {
  return (
    <>
    <div className="w-screen h-screen p-0 m-0 overflow-hidden bg-black -webkit-touch-callout-none flex">
      
    <Scene />
    </div>
    <div className="absolute top-[75px] right-[230px]">
    <CheckoutForm />
    </div>
    </>
  );
}
