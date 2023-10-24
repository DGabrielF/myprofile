import React from "react";

import AboutMe from "./AboutMe";
import Apps from "./Apps";
import DevArea from "./DevArea";
import Friends from "./Friends";
import Initial from "./Initial";
import Stats from "./Stats";
import SignIn from "../Menu/LoginMenu/SignIn";
import SignUp from "../Menu/LoginMenu/SignUp";
import SignOut from "../Menu/LoginMenu/SignOut";

export default function Section ({user, setUser, menuSelected, setMenuSelected, prevPage, setPrevPage, remember, setRemember, setToast, handleEmail, handlePassword, handleLogin, handleNickname, handleRegister, handleLogout}) {
  let content;

  if (menuSelected==="Início") {
    content = <Initial />
  } else if (menuSelected==="Amigos") {
      content = <Friends 
      user={user} 
      setToast={setToast} 
      setMenuSelected={setMenuSelected} 
      setPrevPage={setPrevPage}
      />
  } else if (menuSelected==="Apps") {
    content = <Apps user={user}/>
  } else if (menuSelected==="Estatísticas") {
    content = <Stats />
  } else if (menuSelected==="Sobre Mim") {
    content = <AboutMe />
  } else if (menuSelected==="DEV Area") {
    content = <DevArea />
  } else if (menuSelected==="Login") {
    content = <SignIn 
      user={user}
      setUser={setUser}
      prevPage={prevPage}
      setMenuSelected={setMenuSelected}
      remember={remember}
      setRemember={setRemember}
      handleEmail={handleEmail}
      handleLogin={handleLogin}
      handleNickname={handleNickname}
      handlePassword={handlePassword}
      handleRegister={handleRegister}
      />
  } else if (menuSelected==="Signup") {
    content = <SignUp
      user={user}
      prevPage={prevPage}
      handleNickname={handleNickname}
      handleEmail={handleEmail}
      handlePassword={handlePassword}
      handleRegister={handleRegister}
      />
  } else if (menuSelected==="Logout") {
    content = <SignOut handleLogout={handleLogout}
    setMenuSelected={setMenuSelected}
      />
  }

  return (
    <>{content}</>
  )
}