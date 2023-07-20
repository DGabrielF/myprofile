import React from "react";

import HamburguerMenu from "../HamburguerMenu";
import LoginMenu from "../LoginMenu";

export default function Menu({menuMode, menuSelected, menuItems, handleMenu, handleSection, logged}) {
  return (
    <div 
    className="w-full px-1 pb-3 flex justify-between">
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