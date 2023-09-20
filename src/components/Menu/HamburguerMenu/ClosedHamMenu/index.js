import React from "react";
import { FiMenu } from "react-icons/fi";

export default function ClosedHamMenu({handleMenu}) {
  return (
    <div
    className="ml-1 absolute flex flex-col justify-center">
      <button
      onClick={(e) => handleMenu(e)}
      className="cursor-pointer flex justify-center items-center gap-2">
        <div className="w-0 text-zinc-300 sm:w-full sm:text-zinc-800 font-semibold">MENU</div>
        <FiMenu className="text-zinc-800 w-[25px] sm:w-0 sm:text-zinc-300 lg:w-[25px] lg:text-zinc-800 h-[25px]"/>
      </button>
    </div>
  )
}