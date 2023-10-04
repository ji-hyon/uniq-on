import React from 'react';
import Scene from '../../components/Landing/Scene';
import { CheckoutForm } from "../../components/Common/CheckoutForm";

export function ForLogin() {
  return (
    <>
    <div className="w-screen h-screen p-0 m-0 overflow-hidden bg-black -webkit-touch-callout-none">
    <CheckoutForm />
    <Scene />
    
    </div>
    </>
  );
}
