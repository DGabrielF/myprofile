import React, { Component } from "react";
import Menu from "./Menu";
import SMABought from "./SMA/SMABought";
import SMASection from "./SMA/SMASection";
// import StorageItemSection from "./StorageItemSection";


export default class Main extends Component {
  state = {
    menuMode: false,
    logged: false,
    menuSelected: {number: 0, name: "Home"},
    menuItems: [
      {number: 0, name: "Home"},
      {number: 1, name: "Apps"},
      {number: 2, name: "Stat"},
      {number: 3, name: "About me"},
    ]
  }
  handleMenu = (e) => {
    let { menuMode } = this.state;
    this.setState({menuMode: !menuMode})
  }
  handleSection = (e) => {
    this.setState({menuSelected: {number: e.target.id, name: e.target.textContent}})
    // this.handleMenu(e)
  }
  addingStorageItem = (e) => {
    let form = document.querySelector(".listedItems")
    console.log(form)
    form.innerHTML += `<div>`
  }

  render() {
    const {menuMode, menuSelected, menuItems, logged} = this.state
    return (
      <div className="bg-slate-400 h-screen">
        <Menu 
        menuMode={menuMode}
        menuSelected={menuSelected}
        menuItems={menuItems}
        handleMenu={this.handleMenu}
        handleSection={this.handleSection}
        logged={logged}
        />
        <SMASection />
      </div>
    )
  }
}