import React from "react";
import SignIn from "../Menu/LoginMenu/OutMenu/SignIn";
import SignUp from "../Menu/LoginMenu/OutMenu/SignUp";
import SignOut from "../Menu/LoginMenu/InMenu/SignOut";

export default function Modal({user, handleEmail, handlePassword, handleLogin, handleRegister, handleLogout, modal, handleModal}) {
  let el;
  let cont;
  if (modal.isOn === true) {
    if (modal.content === "signin"){
      cont = (
        <SignIn 
        user={user}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        handleLogin={handleLogin}
        />
      )     
    } else if (modal.content === "signup"){
      cont = (
        <SignUp
        user={user}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        handleRegister={handleRegister}
        />
      )
    } else if (modal.content === "signout"){
      cont = (
        <SignOut
        handleLogout={handleLogout}
        />
      )
    }
  } 
  
  if (modal.isOn === true){
    el = (
      <div>
        <div 
        onClick={e => handleModal(e)}
        className="text-white bg-zinc-900 opacity-90 absolute w-full h-full left-0 top-0 z-40">
        </div> 
        {cont}
      </div>
    )
  } 
  return el
}