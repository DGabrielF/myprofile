import React from "react";
import { FiChevronLeft } from "react-icons/fi";

export default function SidebarOpen ( {sideBar, setSideBar, setSection}) {
  return (
    <div className="abMeSidebarOpen">
    <div className="abMeSidebarOpenButtonsList mt-2">
      <div id="apresentacao" onClick={e => setSection(e.currentTarget.id)} className="devaItem">Apresentação</div>
      <div id="curriculo" onClick={e => setSection(e.currentTarget.id)} className="devaItem">Currículo</div>
      <div id="cursos" onClick={e => setSection(e.currentTarget.id)} className="devaItem">Cursos</div>
      <div id="hobbies" onClick={e => setSection(e.currentTarget.id)} className="devaItem">Hobbies</div>
    </div>
    <div 
    className="abMeSidebarOpenCloseButton"
    onClick={e => setSideBar(!sideBar)}>
      <FiChevronLeft />
    </div>
  </div>
  )
}