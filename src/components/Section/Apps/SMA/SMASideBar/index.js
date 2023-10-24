import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function SMASideBar({sideBarIsOpen, setSideBarIsOpen, itemSelected, setItemSelected, sideBarItems }) {
  return (
    <div className={sideBarIsOpen?"sma-sidebar":"sma-sidebar translate-x-[-82%]"}>
      <div className="sma-sidebar-buttons">
        {sideBarItems.map((item) => (
          <button key={item.number}
          disabled={item.name === itemSelected.name}
          onClick={e => setItemSelected({number: item.number, name:item.name})}
          className="rounded-lg bg-orange-400 px-1 hover:bg-orange-500 text-zinc-700 font-bold">
            {item.name}
          </button>
        ))}
      </div>
      <div
      onClick={e => setSideBarIsOpen(!sideBarIsOpen)}
      className={sideBarIsOpen?"abMeSidebarOpenCloseButton rounded-2xl":"abMeSidebarOpenCloseButton rounded-l-md rounded-r-2xl"}>
        {sideBarIsOpen?<FiChevronLeft />:<FiChevronRight />}
      </div>
    </div>
  )
}