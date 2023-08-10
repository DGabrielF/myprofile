import React, {useState} from "react";
import SidebarOpen from "../../SidebarOpen";
import SidebarClosed from "../../SidebarClosed";
import CreateApplication from "./CreateApplication";
import EditApplication from "./EditApplication";

export default function DevArea() {
  const [sideBar, setSideBar] = useState(true);
  const [section, setSection] = useState("addApp");
  const menuItems = [
    {
      subSection: "Aplicações",
      items: [
        {id:"addApp", title:"Adicionar", content: <CreateApplication />},
        {id:"editApp", title:"Editar", content: <EditApplication />},
      ]
    },
    {
      subSection: "Estatísticas",
      items: [
        {id:"addStat", title:"Adicionar estatísticas", content: "teste"},
        {id:"editStat", title:"Editar estatísticas", content: "teste"},
        {id:"delStat", title:"Remover estatísticas", content: "teste"},
      ]
    },
    {
      subSection: "Sobre mim",
      items: [
        {id:"editPresentation", title:"Editar apresentação", content: "teste"},
        {id:"editCurricStyle", title:"Formato do currículo", content: "teste"},
        {id:"addCourse", title:"Adicionar um curso", content: "teste"},
        {id:"delCourse", title:"Remover um curso", content: "teste"},
        {id:"addSkill", title:"Adicionar habilidade", content: "teste"},
        {id:"editSkill", title:"Editar habilidade", content: "teste"},
        {id:"delSkill", title:"Remover habilidade", content: "teste"},
        {id:"addHobby", title:"Adicionar um hobby", content: "teste"},
      ]
    }
  ];

  let sideBarContent;
  if (sideBar) {
    sideBarContent = <SidebarOpen sideBar={sideBar} setSideBar={setSideBar} setSection={setSection} menuItemsList={menuItems}/>
  } else {
    sideBarContent = <SidebarClosed sideBar={sideBar} setSideBar={setSideBar}/>
  };

  let mainContent;
  menuItems.map((folder) => {
    folder.items.map((item) => {
      if (item.id === section) {
        mainContent = (
          <div className="w-full mr-1 flex flex-col gap-1 overflow-hidden">
            <div className="bg-zinc-700 text-zinc-50 text-lg font-extrabold mt-1 devaTopic">
              {item.title.toUpperCase()}
            </div>
            <div className="bg-zinc-600 text-zinc-50 h-full devaTopic relative overflow-auto">
              {item.content}
            </div>
          </div>
        )
      }
    })
  }) 
  
  return (    
  <div className="devaBg">
    {sideBarContent}
    {mainContent}
  </div>
  )
}
