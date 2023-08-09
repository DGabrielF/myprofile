import React from "react";
import { FiChevronLeft } from "react-icons/fi";

export default function SidebarOpen ( {sideBar, setSideBar, setSection, menuItemsList}) {
  return (
    <div className="abMeSidebarOpen overflow-auto">
      <div className="w-full flex flex-col gap-1">
        {menuItemsList.map((subSection) => {
          return (
          <div key={subSection.subSection}
          className="flex flex-col gap-1">
            {subSection.subSection}
            {subSection.items.map((item) => {
              return <button id={item.id} onClick={e => setSection(e.currentTarget.id)} className="devaItem">{item.title}</button>
            })}
          </div>)
        })}
      </div>
      <div 
      className="abMeSidebarOpenCloseButton"
      onClick={e => setSideBar(!sideBar)}>
        <FiChevronLeft />
      </div>
    </div>
  )
}