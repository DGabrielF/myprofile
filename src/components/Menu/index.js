import React from "react";
import HamburguerMenu from "./HamburguerMenu";
import LoginMenu from "./LoginMenu";

export default function Menu({menuMode, menuSelected, menuItems, handleMenu, handleSection, user, setMenuSelected}) {
  return (
    <div 
    className="bg-zinc-300 w-full h-[33px] p-1 z-40 fixed flex justify-between">
      <HamburguerMenu 
      hamMenuIsOpen={menuMode}
      menuItems={menuItems}
      menuSelected={menuSelected}
      handleMenu={handleMenu}
      setMenuSelected={setMenuSelected}
      />
      <LoginMenu
      user={user}
      menuSelected={menuSelected}
      setMenuSelected={setMenuSelected}
      />
    </div>
  )
}