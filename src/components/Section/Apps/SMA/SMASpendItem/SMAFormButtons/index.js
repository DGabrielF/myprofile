import React from "react";

export default function SMAFormButtons({handleCleanEntries, handleSubmit, handleSend}) {
  return (    
    <div className="w-[95%] mx-auto my-2 pt-1 flex justify-around gap-1">
      <button
      onClick={e => handleCleanEntries(e)}
      className="smaButtons bg-red-300 hover:bg-red-400">
        LIMPAR
      </button>
      <button
      onMouseEnter={e => handleSubmit(e)}
      onClick={e => handleSend(e)}
      className="smaButtons">
        CONFIRMAR
      </button>
    </div>
  )
}