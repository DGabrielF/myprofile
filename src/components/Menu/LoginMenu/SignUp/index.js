import React, { useState } from "react";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { validateEmail } from "../../../../validations"

export default function SignUp ({user, prevPage, handleNickname, handleEmail, handlePassword, handleRegister}) {
  const [verifyPassword, setVerifyPassword] = useState("");
  
  return (
    <div className="modal z-0">
      <h2 className="title-text text-violet-900">CADASTRE-SE</h2>
      <input
      type="text" value={user.name} placeholder="Como quer ser chamado?"
      onChange={e => handleNickname(e)}
      className="inputs w-[90%] h-[30%]"/>
      <div className={user.name.length > 20 || user.name.length < 3?"alertText":"successText"}>
        Entre 3 e 20 caracteres
        {!validateEmail(user.email)? <FiSquare />:<FiCheckSquare />}
      </div>
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
      <button 
      disabled={!validateEmail(user.email)||user.password.length > 10||user.password.length < 6||user.password !== verifyPassword}
      onClick={(e) => handleRegister(e, prevPage)}
      className="buttons w-[90%] mb-2">
        CADASTRAR
      </button>
    </div>
  )
}