import React, { Component } from "react";
import Menu from "./Menu";
import Initial from "./Section/Initial";
import SMASection from "./Section/Apps/SMA/SMASection";
import Stats from "./Section/Stats";
import AboutMe from "./Section/AboutMe";
import DevArea from "./Section/DevArea";
import Modal from "./Modal";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-config";

export default class Main extends Component {
  state = {
    menuMode: false,
    user: {email:"", password:"", logged: false},
    menuSelected: {number: 0, name: "Home", section: <Initial />},
    menuItems: [
      {number: 0, name: "Home", section: <Initial />},
      {number: 1, name: "Apps", section: <SMASection /> },
      {number: 2, name: "Stat", section: <Stats />},
      {number: 3, name: "About me", section: <AboutMe />},
      {number: 4, name: "Dev Area", section: <DevArea />}
    ],
    modal: {isOn: false, content: ""} ,
  }

  handleMenu = (e) => {
    let { menuMode } = this.state;
    this.setState({menuMode: !menuMode})
  }

  handleEmail = (e, clean=false) => {
    let { user } = this.state
    if (clean === false) {
      this.setState({user: {...user, email:e.currentTarget.value}})
    } else {
      this.setState({user: {...user, email:""}})
    }
  }

  handlePassword = (e, clean=false) => {
    let { user } = this.state
    if (clean === false) {
      this.setState({user: {...user, password:e.currentTarget.value}})
    } else {
      this.setState({user: {...user, password:""}})
    }
  }
  
  handleLogin = async (e) => {
    const { user } = this.state;
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      this.setState({
        user: {...user, logged: true},
        modal: {isOn: false, content: undefined}
      })
      alert('Conectado!')
    } catch (error) {
      alert('Erro ao tentar conectar: '+ error.message)
    }
  }

  handleRegister = async (e) => {
    const { user } = this.state
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      this.handleEmail(e, true)
      this.handlePassword(e, true)
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      alert('Erro ao realizar o cadastro: ' + error.message);
    }
  };

  handleLogout = async (e) => {
    try {
      await signOut(auth)
      this.setState({
        user: {email:"", password:"", logged: false},
        modal: {isOn: false, content: undefined}
      })
      alert('Desconectado!')
    } catch (error) {
      alert('Erro ao tentar desconectar: '+ error.message)
    }
  }

  handleSection = (e) => {
    const { menuItems } = this.state
    const result = menuItems.filter((item) => item.number === Number(e.target.id))
    this.setState({menuSelected: {number: result[0].number, name: result[0].name, section: result[0].section}})
    this.handleMenu(e)
  }

  handleModal = (e) => {
    if (e.currentTarget.hasAttribute('name')) {
      this.setState({modal: {isOn: true, content: e.currentTarget.name}})  
    } else {
      this.setState({modal: {isOn: false, content: undefined}})
    }
  }

  render() {
    const {menuMode, menuSelected, menuItems, user, modal} = this.state
    return (
      <div className="bg-slate-400 h-screen">
        <Menu 
        menuMode={menuMode}
        handleEmail={this.handleEmail}
        menuSelected={menuSelected}
        menuItems={menuItems}
        handleMenu={this.handleMenu}
        handleSection={this.handleSection}
        user={user}
        handleLogged={this.handleLogged}
        modal={modal}
        handleModal={this.handleModal}
        />
        <Modal
        user={user}
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        handleLogin={this.handleLogin}
        handleRegister={this.handleRegister}
        handleLogout={this.handleLogout}
        modal={modal}
        handleModal={this.handleModal}
        />
        <div className="h-full pt-8">
          {menuSelected.section}
        </div>
      </div>
    )
  }
}