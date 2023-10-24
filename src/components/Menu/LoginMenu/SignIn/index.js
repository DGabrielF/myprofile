import React, { useEffect } from "react";
import { validateEmail } from "../../../../validations"


export default function SignIn ({user, setUser, prevPage, setMenuSelected, remember, setRemember, handleEmail, handlePassword, handleLogin}) {
  useEffect(()=>{
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    if (savedEmail && savedPassword) {
      setUser({...user, email:savedEmail, password:savedPassword});
      setRemember(true)
    }
  }, [])

  return (
    <div className="modal z-0">
      <h2 className="pt-2 pb-1 text-center font-extrabold text-2xl">FAZER LOGIN</h2>
      <input 
      type="email" value={user.email} placeholder="E-mail"
      onChange={e => handleEmail(e)}
      className="inputs w-[90%]"/>
      <input 
      type="password" value={user.password} placeholder="Senha"
      onChange={e => handlePassword(e)} 
      className="inputs w-[90%]"/>
      <div className="flex">
        <div>
          Lembrar e-mail e senha
        </div>
        <input type="checkbox" checked={remember} onChange={e=>setRemember(!remember)} />
      </div>
      <button
      disabled={!validateEmail(user.email)||user.password.length > 10||user.password.length < 6}
      onClick={e => handleLogin(e, prevPage)}
      className="buttons w-[90%] mb-2">
        ENTRAR
      </button>
      <div className="text-sm flex flex-col items-center gap-1 mb-2">
        Se ainda não possui uma conta
        <div 
        onClick={e => setMenuSelected("Signup")}
        className="text-cyan-800 text-lg underline underline-offset-2 cursor-pointer">
          Registre-se
        </div>
      </div>
    </div>
  )
}