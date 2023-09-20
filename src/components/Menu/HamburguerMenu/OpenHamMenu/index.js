import React from "react";
import { FiX } from "react-icons/fi";

export default function OpenHamMenu({menuSelected, menuItems, handleMenu, handleSection}){
  return (
    <div
    className="p-2
    w-[50%] min-w-[100px] max-w-[150px]
    bg-zinc-200
    absolute left-0 top-0
    flex flex-col rounded-ee-2xl">
      <div
      className="flex justify-end">
        <div className="px-1 w-0 text-zinc-300 sm:w-full sm:text-zinc-700 font-semibold">MENU</div>
        <div
        onClick={(e) => handleMenu(e)}
        className="cursor-pointer flex justify-around items-center">
          <FiX />
        </div>  
      </div>
      <div
      className="w-full mt-3 flex flex-col gap-2">
        {menuItems.map((item, index) => {
          if (item.number !== Number(menuSelected.number)) {return(
            <button key={item.number} id={item.number}
              onClick={(e) => handleSection(e)}
              className="px-1
              text-zinc-200 hover:text-zinc-800 font-semibold
              rounded-lg
              bg-zinc-600 hover:bg-violet-400">
                {item.name}
            </button>
            )
          } else return undefined
        })}
      </div>
    </div>
  )
}