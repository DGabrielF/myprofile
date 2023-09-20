import React from "react";
import { validateEmail } from "../../../../../validations"


export default function SignIn ({user, handleEmail, handlePassword, handleLogin}) {
  let button;
  if (!validateEmail(user.email)||user.password.length > 10||user.password.length < 6) {
    button = (
      <button
      className="unable-buttons w-[90%] mb-2">
        ENTRAR
      </button>
    )
  } else {
    button = (
      <button onClick={(e) => handleLogin(e)}
      className="buttons w-[90%] mb-2">
        ENTRAR
      </button>
    )
  }

  return (
    <div className="modal">
      <h2 className="py-1 text-center font-extrabold text-2xl">FAZER LOGIN</h2>
      <input 
      type="email" value={user.email} placeholder="E-mail"
      onChange={(e) => handleEmail(e)}
      className="inputs w-[90%]"/>
      <input 
      type="password" value={user.password} placeholder="Senha"
      onChange={(e) => handlePassword(e)} 
      className="inputs w-[90%]"/>
      {button}
    </div>
  )
}