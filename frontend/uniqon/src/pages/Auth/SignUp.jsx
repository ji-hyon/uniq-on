import { SignUpButton } from "../../components/Auth/SignUpButton"
import { useState } from "react";

export function SignUp() {

  return (
    <div>
      <p className="m-5 text-4xl font-bold">회원가입 페이지</p>
      <SignUpButton />
    </div>
  );
}