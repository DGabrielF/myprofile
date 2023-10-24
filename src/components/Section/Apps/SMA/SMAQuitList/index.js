import React from "react";

export default function SMAQuitList ({setListSelected, setItemSelected}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="smaList flex flex-col items-center justify-center">
        <div>
          Deseja sair desse estoque?
        </div>
        <div className="flex w-full justify-between">
          <button
          onClick={e => {setListSelected("");setItemSelected({number: 1, name: "Listas", show:"on"})}}
          className="smaButtons w-[48%] hover:bg-lime-300"
          >SIM</button>
          <button
          onClick={e => setItemSelected({number: 4, name: "Estoque", show:""})}
          className="smaButtons w-[48%]"
          >NÃO</button>
        </div>
      </div>
    </div>
  )
}