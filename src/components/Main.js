import React, { useState } from "react";
import Menu from "./Menu";
import Modal from "./Modal";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { fbMessage } from "../firebase-errors";
import { setDoc, doc } from "firebase/firestore";
import Toast from "./Toast";
import { validateEmail } from "../validations";
import Section from "./Section";


export default function Main () {
  const [menuMode, setMenuMode] = useState(false);
  const [user, setUser] = useState({
    name: "" ,
    uid:"",
    email:"",
    password:"",
    logged: false,
    friendsList:[],
    applicantsList:[],
    blockList:[],
    requestList:[]
    });
  const [menuSelected, setMenuSelected] = useState("Início");
  const [menuItems, setMenuItems] = useState(["Início", "Amigos", "Apps", "Estatísticas", "Sobre Mim", "DEV Area"]);
  const [prevPage, setPrevPage] = useState("");
  const [toast, setToast] = useState({isOn: false, type: "", title: "", message: ""});
  const [modal, setModal] = useState({isOn: false, content: ""});
  const [remember, setRemember] = useState(false);

  const handleMenu = (e) => setMenuMode(!menuMode);

  const handleNickname = (e, clean=false) => !clean? setUser({...user, name:e.currentTarget.value}): setUser({...user, name:""});

  const handleEmail = (e, clean=false) => !clean? setUser({...user, email:e.currentTarget.value}): setUser({...user, email:""});

  const handlePassword = (e, clean=false) => !clean? setUser({...user, password:e.currentTarget.value}): setUser({...user, password:""});
  
  const handleLogin = async (e, prevPage) => {
    handleToast(e)
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setUser({...user, uid: auth.currentUser.uid, logged: true});
      setModal({isOn: false, content: undefined});
      if (remember) {
        localStorage.setItem('email', user.email);
        localStorage.setItem('password', user.password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password')
      }
      setToast({isOn: true, type: "success", title: "tudo certo", message: 'Você está conectado!'});
      setMenuSelected(prevPage||"Início");
    } catch (error) {
      setToast({isOn: true, type: "error", title: "erro", message: fbMessage[error.message]});
    }
  };
  
  const handleRegister = async (e, prevPage) => {
    handleToast(e)
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      const docRef = doc(db, "Users", auth.currentUser.uid);

      await setDoc(docRef,
        {
        name:user.name,
        friendsList:[],
        applicantsList:[],
        blockList:[],
        requestList:[],
        });
      handleNickname(e, true);
      handleEmail(e, true);
      handlePassword(e, true);
      setToast({isOn: true, type: "success", title: "tudo certo", message: "Cadastro realizado com sucesso!"});
      handleLogin(e, prevPage)
      setMenuSelected(prevPage);
    } catch (error) {
      setToast({isOn: true, type: "error", title: "erro", message: fbMessage[error.message]});
    }
  };

  const handleToast = (e) => {
    setToast({...toast, inOn: true})
    setTimeout(() => {
      setToast((prevState) => ({
        ...toast, isOn: !prevState.toast,
      }));
    }, 2500)
  };
  
  const handleLogout = async (e) => {
    try {
      await signOut(auth)
      setUser({
        name: "" ,
        uid:"",
        email:"",
        password:"",
        logged: false,
        friendsList:[],
        applicantsList:[],
        blockList:[],
        requestList:[]
        });
      setModal({isOn: false, content: undefined});
      setToast({isOn: true, type: "success", title: "tudo certo", message: 'Você se desconectou!'});
      setMenuSelected('Início');
    } catch (error) {
      setToast({isOn: true, type: "error", title: "erro", message: fbMessage[error.message]});
    }
  };
   
  const handleModal = (e) => e.currentTarget.hasAttribute('name')? setModal({isOn: true, content: e.currentTarget.name}): setModal({isOn: false, content: undefined});
 
  if (toast) {
    setTimeout(function () {
      setToast(false)
    }, 3000)
  }

  return (
    <div className="bg-scroll bg-gradient-to-b from-zinc-900 to-zinc-700 h-screen">
      <Toast toast={toast}/>
      <Menu 
      menuMode={menuMode}
      menuSelected={menuSelected}
      menuItems={menuItems}
      setMenuMode={setMenuMode}
      handleEmail={handleEmail}
      handleNickname={handleNickname}
      handleMenu={handleMenu}
      setMenuSelected={setMenuSelected}
      user={user}
      modal={modal}
      validadeEmail={validateEmail}
      />
      <Modal
      user={user}
      handleEmail={handleEmail}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      handleNickname={handleNickname}
      handlePassword={handlePassword}
      handleRegister={handleRegister}
      modal={modal}
      handleModal={handleModal}
      />
      <div className="h-full pt-8 overflow-auto">
        <Section 
        user={user}
        setUser={setUser}
        menuSelected={menuSelected}
        setMenuSelected={setMenuSelected}
        prevPage={prevPage}
        setPrevPage={setPrevPage}
        remember={remember}
        setRemember={setRemember}
        setToast={setToast}
        handleEmail={handleEmail}
        handleLogin={handleLogin}
        handleNickname={handleNickname}
        handlePassword={handlePassword}
        handleRegister={handleRegister}
        handleLogout={handleLogout}
        />
      </div>
    </div>
  )
}
