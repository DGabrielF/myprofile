import React from "react";
import OpenHamMenu from "./OpenHamMenu";
import ClosedHamMenu from "./ClosedHamMenu";

export default function HamburguerMenu({hamMenuIsOpen, menuItems, menuSelected, handleMenu, setMenuSelected}) {

  return (
    <div>
      {hamMenuIsOpen?
      <OpenHamMenu menuSelected={menuSelected}
      menuItems={menuItems}
      handleMenu={handleMenu}
      setMenuSelected={setMenuSelected}/>:
      <ClosedHamMenu handleMenu={handleMenu} 
      />}
    </div>
  )
}