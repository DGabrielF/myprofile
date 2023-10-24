import React from "react"

export default function SignOut ({handleLogout, setMenuSelected, prevPage}) {
  return (
    <div className="modal z-0">
      <h2 className="pt-2 pb-1 text-center font-extrabold text-2xl">Tem certeza que deseja sair?</h2>
      <button onClick={e => handleLogout(e)}
      className="buttons w-[90%] mb-2">
        SAIR
      </button>
      <button
      onClick={e => setMenuSelected(prevPage||"Início")}
      className="buttons w-[90%] mb-2">
        CANCELAR
      </button>
    </div>
  )
}