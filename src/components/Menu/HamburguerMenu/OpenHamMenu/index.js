import React from "react";
import { FiX } from "react-icons/fi";

export default function OpenHamMenu({menuSelected, menuItems, handleMenu, handleSection}){
  return (
    <div
    className="p-2 w-[25%] min-w-[100px] max-w-[150px] left-0 top-0 bg-slate-100 absolute flex flex-col rounded-ee-2xl transition duration-300">
      <div
      className="flex justify-end">
        <div
        onClick={(e) => handleMenu(e)}
        className="cursor-pointer">
          <FiX />
        </div>  
      </div>
      <div
      className="w-full mt-3 flex flex-col gap-2">
        {menuItems.map((item, index) => {
          if (item.number !== Number(menuSelected.number)) {return(
            <button key={item.number} id={item.number}
              onClick={(e) => handleSection(e)}
              className="rounded-lg bg-slate-300 px-1 hover:bg-slate-200">
                {item.name}
            </button>
            )
          } else return undefined
        })}
      </div>
    </div>
  )
}