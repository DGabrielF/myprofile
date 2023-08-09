import React from "react";
import { FiMenu } from "react-icons/fi";

export default function ClosedHamMenu({handleMenu}) {
  return (
    <div
    className="ml-1 absolute flex flex-col">
      <button
      onClick={(e) => handleMenu(e)}
      className="w-full cursor-pointer flex justify-start">
        <FiMenu />
      </button>
    </div>
  )
}