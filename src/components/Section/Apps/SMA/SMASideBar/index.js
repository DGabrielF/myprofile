import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function SMASideBar({sideBarIsOpen, itemSelected, sideBarItems, handleSideBar, handlePage}) {
  let sideBar;

  if (sideBarIsOpen === false) {
    sideBar = (
      <div className="bg-slate-50 p-1 h-full rounded-tr-2xl rounded-br-2xl flex justify-center items-center">
        <button
        onClick={(e) => handleSideBar(e)}
        className="abMeSidebarClosedOpenButton h-full hover:bg-zinc-200">
          <FiChevronRight />
        </button>
      </div>
    )
  } else if (sideBarIsOpen === true) {
    sideBar = (
      <div className="bg-zinc-50 w-[50%] h-full min-w-[150px] max-w-[250px] p-1 rounded-tr-2xl rounded-br-2xl flex gap-1">
        <div className="w-full mt-2 bg-slate-50 flex flex-col gap-2">
          {sideBarItems.map((item, index) => {
            if (item.number !== Number(itemSelected.number)) {return(
              <button key={item.number} id={item.number}
              onClick={(e) => handlePage(e)}
              className="rounded-lg bg-zinc-300 px-1 hover:bg-slate-200">
                {item.name}
              </button>
              )
            } else return undefined
          })}
        </div>
        <div
        onClick={(e) => handleSideBar(e)}
        className="abMeSidebarOpenCloseButton max-w-[30px] h-full hover:bg-zinc-200 rounded-2xl">
          <FiChevronLeft />
        </div>  
      </div>
    )
  }

  return (
    <div>
      {sideBar}
    </div>
  )
}