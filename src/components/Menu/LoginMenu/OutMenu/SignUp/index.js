import React from "react"

export default function SignUp ({user, handleEmail, handlePassword, handleRegister}) {
  return (
    <div className="bg-zinc-600 w-[70%] min-w-[100px] left-[15%] max-h-[40%] min-h-[115px] top-[50%] z-50 absolute rounded-xl flex flex-col gap-1 justify-around">
      <h2 className="py-1 text-center font-extrabold text-2xl">CADASTRE-SE</h2>
      <input 
      type="email" value={user.email} placeholder="E-mail"
      onChange={(e) => handleEmail(e)}
      className="inputs w-[90%] h-[30%]"/>
      <input 
      type="password" value={user.password} placeholder="Senha"
      onChange={(e) => handlePassword(e)} 
      className="inputs w-[90%] h-[30%]"/>
      <button onClick={(e) => handleRegister(e)}
      className="buttons w-[90%] mb-2">
      CADASTRAR
      </button>
    </div>
  )
}