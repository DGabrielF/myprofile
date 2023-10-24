import React from "react";

export default function LoginMenu ({user, menuSelected, setMenuSelected}) {
  return (
    <div>
      {user.uid?
        <button onClick={(e) => setMenuSelected("Logout")} >SAIR</button>:
        menuSelected==='Login'?
        <button onClick={(e) => setMenuSelected("Signup")} >REGISTRAR</button>:
        menuSelected==='Signup'?
        <button onClick={(e) => setMenuSelected("Login")} >ENTRAR</button>:
        <div className="flex gap-3">
          <button onClick={(e) => setMenuSelected("Login")} >ENTRAR</button>
          <button onClick={(e) => setMenuSelected("Signup")} >REGISTRAR</button>
        </div>
      }
    </div>
  )
}