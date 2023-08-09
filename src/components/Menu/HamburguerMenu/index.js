import React from "react";
import OpenHamMenu from "./OpenHamMenu";
import ClosedHamMenu from "./ClosedHamMenu";

export default function HamburguerMenu({hamMenuIsOpen, menuItems, menuSelected, handleMenu, handleSection}) {
  let hamMenu;
  if (hamMenuIsOpen === false) {
    hamMenu = (
      <ClosedHamMenu
      handleMenu={handleMenu} 
      />
    )
  } else if ((hamMenuIsOpen === true)){
    hamMenu = (
      <OpenHamMenu 
      menuSelected={menuSelected}
      menuItems={menuItems}
      handleMenu={handleMenu}
      handleSection={handleSection}/>
    )
  }
  return (
    <div
    className="mt-1">
        {hamMenu}
    </div>
  )
}