import React from "react"

export default function SignOut ({handleLogout}) {
  return (
    <div className="bg-zinc-600 w-[70%] min-w-[100px] left-[15%] h-[40%] min-h-[115px] top-[25%] z-50 absolute rounded-xl flex flex-col gap-2 justify-around items-center">
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