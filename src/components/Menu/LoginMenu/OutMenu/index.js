import React from "react";

export default function OutMenu({handleModal}) {
  return (
    <div className="flex gap-2">
      <button name="signin" className="flex items-center"
      onClick={(e) => handleModal(e)}>
        <div className="px-1 text-zinc-700 font-semibold">ENTRAR</div>
      </button>
      <button name="signup" className="flex items-center"
      onClick={(e) => handleModal(e)}>
        <div className="px-1 text-zinc-700 font-semibold">REGISTRAR</div>
      </button>
    </div>
    )
}