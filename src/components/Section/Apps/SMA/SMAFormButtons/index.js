import React from "react";

export default function SMAFormButtons({handleListItems, handleSave}) {
  return (    
    <div className="w-[95%] mx-auto my-2 pt-1 flex justify-around gap-1">
      <button
      onClick={(e) => handleListItems(e)}
      className="smaButtons">
        Salvar Produto
      </button>
      <button
      onClick={(e) => handleSave(e)}
      className="smaButtons">
        Salvar Lista
      </button>
    </div>
  )
}