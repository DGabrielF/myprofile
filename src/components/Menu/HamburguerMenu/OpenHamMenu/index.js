import React from "react";
import { FiX } from "react-icons/fi";

export default function OpenHamMenu({menuSelected, menuItems, handleMenu, setMenuSelected}){
  return (
    <div
    className="p-2
    w-[50%] min-w-[100px] max-w-[150px]
    bg-zinc-200
    absolute left-0 top-0
    flex flex-col rounded-ee-2xl">
      <div
      className="flex justify-end">
        
        <div
        onClick={(e) => handleMenu(e)}
        className="cursor-pointer flex justify-around items-center">
          <FiX />
        </div>  
      </div>
      <div
      className="w-full mt-3 flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <button key={item} id={item}
            disabled={item === menuSelected}
            onClick={e => {setMenuSelected(item); handleMenu(e)}}
            className={`px-1
            ${item === menuSelected ? 'opacity-50 cursor-not-allowed hover:text-zinc-200' : 'hover:bg-violet-400'}
            text-zinc-200 hover:text-zinc-800 font-semibold
            rounded-lg
            bg-zinc-600`}>
              {item}
          </button>
        ))}
      </div>
    </div>
  )
}