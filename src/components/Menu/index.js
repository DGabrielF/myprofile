import React from "react";
import HamburguerMenu from "./HamburguerMenu";
import InMenu from "./LoginMenu/InMenu";
import OutMenu from "./LoginMenu/OutMenu";

export default function Menu({menuMode, menuSelected, menuItems, handleMenu, handleSection, user, handleLogged, modal, handleModal}) {
  return (
    <div 
    className="bg-zinc-200 w-full p-1 z-40 fixed flex justify-between">
      <HamburguerMenu 
      hamMenuIsOpen={menuMode}
      menuItems={menuItems}
      menuSelected={menuSelected}
      handleMenu={handleMenu}
      handleSection={handleSection}
      />
      <div>
        {user.logged?<InMenu handleModal={handleModal}/>:<OutMenu handleModal={handleModal}/>}
      </div>
    </div>
  )
}