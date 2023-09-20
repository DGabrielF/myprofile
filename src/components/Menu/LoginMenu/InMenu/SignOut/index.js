import React from "react"

export default function SignOut ({handleLogout}) {
  return (
    <div className="modal">
      <h2 className="py-1 text-center font-extrabold text-2xl">Tem certeza que deseja sair?</h2>
      <button onClick={(e) => handleLogout(e)}
      className="buttons w-[90%] mb-2">
        SAIR
      </button>
      <button
      className="buttons w-[90%] mb-2">
        CANCELAR
      </button>
    </div>
  )
}