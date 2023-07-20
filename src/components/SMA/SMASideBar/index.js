import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function SMASideBar({sideBarIsOpen, itemSelected, sideBarItems, handleSideBar, handlePage}) {
  let sideBar;

  if (sideBarIsOpen === false) {
    sideBar = (
      <div className="bg-slate-50 p-1 rounded-tr-lg rounded-br-lg">
        <button
        onClick={(e) => handleSideBar(e)}
        className="w-full cursor-pointer flex justify-start">
          <FiChevronRight />
        </button>
      </div>
    )
  } else if (sideBarIsOpen === true) {
    sideBar = (
      <div className="bg-slate-50 w-[25%] min-w-[150px] max-w-[250px] p-1 rounded-tr-lg rounded-br-lg flex flex-col">
        <div
        className="flex justify-end">
          <div
          onClick={(e) => handleSideBar(e)}
          className="cursor-pointer">
            <FiChevronLeft />
          </div>  
        </div>
        <div className="w-full mt-2 bg-slate-50 flex flex-col gap-2">
          {sideBarItems.map((item, index) => {
            if (item.number !== Number(itemSelected.number)) {return(
              <button key={item.number} id={item.number}
              onClick={(e) => handlePage(e)}
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
    <div>
      {sideBar}
    </div>
  )
}