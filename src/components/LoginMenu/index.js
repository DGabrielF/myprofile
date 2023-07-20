import React from "react";

export default function LoginMenu({isLogged}) {
  let sign;
  if (isLogged === false) {
    sign = (
      <div>
        Sign in Sign up
      </div>
      )
  } else if ((isLogged === true)){
    sign = (
      <div>
        Sign out
      </div>
    )
  }
  return (    
  <div>
    {sign}
  </div>
  )
}