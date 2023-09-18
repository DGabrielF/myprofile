import React, { useState } from "react";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { validateEmail } from "../../../../../validations"

export default function SignUp ({user, handleEmail, handlePassword, handleRegister}) {
  const [verifyPassword, setVerifyPassword] = useState("");
  let button;

  if  (!validateEmail(user.email)||user.password.length > 10||user.password.length < 6||user.password !== verifyPassword) {
    button = (
      <button
      className="unable-buttons w-[90%] mb-2">
        CADASTRAR
      </button>
    )
  } else {
    button = (
      <button onClick={(e) => handleRegister(e, user)}
      className="buttons w-[90%] mb-2">
        CADASTRAR
      </button>
    )
  }
  return (
    <div className="bg-zinc-600 w-[70%] min-w-[100px] left-[15%] max-h-[40%] min-h-[115px] top-[25%] z-50 absolute rounded-xl flex flex-col gap-1 justify-around items-center">
      <h2 className="py-1 text-center font-extrabold text-2xl">CADASTRE-SE</h2>
      <input 
      type="email" value={user.email} placeholder="E-mail"
      onChange={(e) => handleEmail(e)}
      className="inputs w-[90%] h-[30%]"/>

      <div className={!validateEmail(user.email)?"alertText":"successText"}>
        Email válido
        {!validateEmail(user.email)? <FiSquare />:<FiCheckSquare />}
      </div>

      <input 
      type="password" value={user.password} placeholder="Senha"
      onChange={(e) => handlePassword(e)} 
      className="inputs w-[90%] h-[30%]"/>
      <div>A senha deve conter</div>
      <div className={user.password.length > 10?"alertText":"successText"}>
        menos que 10 caracteres
        {user.password.length > 10? <FiSquare />:<FiCheckSquare />}
      </div>
      <div className={user.password.length < 6?"alertText":"successText"}>
        mais que 6 caracteres
        {user.password.length < 6? <FiSquare />:<FiCheckSquare />}
      </div>
      
      <input
      type="password" value={verifyPassword} placeholder="Confime sua senha"
      onChange={(e) => setVerifyPassword(e.currentTarget.value)} 
      className="inputs w-[90%] h-[30%]"/>

      <div className={user.password !== verifyPassword?"alertText":"successText"}>
        {user.password !== verifyPassword?"Senhas diferentes":"Senhas iguais"}
        {user.password !== verifyPassword?<FiSquare />:<FiCheckSquare />}
      </div>
      {button}
    </div>
  )
}