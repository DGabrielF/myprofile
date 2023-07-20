import React from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function HamburguerMenu({hamMenuIsOpen, menuItems, menuSelected, handleMenu, handleSection}) {
  let hamMenu;
  if (hamMenuIsOpen === false) {
    hamMenu = (
      <div
      className="ml-1 absolute flex flex-col">
        <button
        onClick={(e) => handleMenu(e)}
        className="w-full cursor-pointer flex justify-start">
          <FiMenu />
        </button>
      </div>
    )
  } else if ((hamMenuIsOpen === true)){
    hamMenu = (
      <div
      className="w-[25%] min-w-[100px] max-w-[150px] bg-slate-50 absolute flex flex-col">
        <div
        className="flex justify-end">
          <div
          onClick={(e) => handleMenu(e)}
          className="cursor-pointer">
            <FiX />
          </div>  
        </div>
        <div
        className="w-full mt-2  flex flex-col gap-2">
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
  return (
    <div
    className="mt-1">
        {hamMenu}
    </div>
  )
}