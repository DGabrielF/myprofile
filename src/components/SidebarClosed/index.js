import React from "react";
import { FiChevronRight } from "react-icons/fi";

export default function SidebarOpen ( {sideBar, setSideBar}) {
  return (
    <div className="abMeSidebarClosed">
      <div
      className="abMeSidebarClosedOpenButton"
      onClick={e => setSideBar(!sideBar)}>
        <FiChevronRight />
      </div>
    </div>
  )
} 