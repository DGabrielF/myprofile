import React from "react";
import InMenu from "./InMenu";
import OutMenu from "./OutMenu";

export default function LoginMenu({user, handleModal}) {
  let sign;
  if (user.logged === false) {
    sign = <OutMenu handleModal={handleModal}/>
  } else if ((user.logged === true)){
    sign = <InMenu handleModal={handleModal}/>
  }
  return (    
  <div>
    {sign}
  </div>
  )
}