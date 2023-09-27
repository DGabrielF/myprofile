import React, { useEffect, useState } from "react";
import Presentation from "./Presentation";
import SidebarOpen from "./SidebarOpen";
import SidebarClosed from "../../SidebarClosed";
import Courses from "./Courses";

export default function AboutMe() {
  const [sideBar, setSideBar] = useState(false);
  const [section, setSection] = useState("apresentacao");
  const menuItems = [
    {name:"apresentacao", title:"Apresentação", content: <Presentation />},
    {name:"curriculo", title:"Currículo", content: <Presentation />},
    {name:"cursos", title:"Cursos", content: <Courses />},
    {name:"hobbies", title:"Hobbies", content: <Presentation />},
  ];

  useEffect(() => {document.title = 'DGF - Sobre mim'}, []);
  let sideBarContent;
  if (sideBar) {
    sideBarContent = <SidebarOpen sideBar={sideBar} setSideBar={setSideBar} setSection={setSection}/>
  } else {
    sideBarContent = <SidebarClosed sideBar={sideBar} setSideBar={setSideBar}/>
  };

  return (    
  <div className="abMeBg">
    {sideBarContent}
    {menuItems.map((item) => {
      if (item.name === section) {
        return (
          <div className="w-full flex flex-col gap-1">
            <div className="bg-zinc-700 text-zinc-50 text-lg font-extrabold mr-1 mt-1 devaTopic">
              {item.title.toUpperCase()}
            </div>
            <div className="bg-zinc-600 text-zinc-50 mr-1 h-full mb-1 devaTopic relative overflow-auto">
              {item.content}
            </div>
          </div>
        )
      }
    })}
  </div>
  )
}