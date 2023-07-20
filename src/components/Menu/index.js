import React from "react";
import HamburguerMenu from "../HamburguerMenu";
import LoginMenu from "../LoginMenu";

export default function Menu({menuMode, menuSelected, menuItems, handleMenu, handleSection, logged}) {
  return (
    <div 
    className="bg-slate-100 w-full p-1 z-40 fixed flex justify-between">
      <HamburguerMenu 
      hamMenuIsOpen={menuMode}
      menuItems={menuItems}
      menuSelected={menuSelected}
      handleMenu={handleMenu}
      handleSection={handleSection}
      />
      <LoginMenu
      isLogged={logged}
      />
    </div>
  )
}