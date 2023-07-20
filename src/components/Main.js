import React, { Component } from "react";
import Menu from "./Menu";
import StorageItem from "./StorageItem";

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
  render() {
    const {menuMode, menuSelected, menuItems, logged} = this.state
    return (
      <div className="flex flex-col">
        <Menu 
        menuMode={menuMode}
        menuSelected={menuSelected}
        menuItems={menuItems}
        handleMenu={this.handleMenu}
        handleSection={this.handleSection}
        logged={logged}
        />
        <div 
        className="text-center text-2xl pb-2">
          Adicionar produto ao estoque
        </div>
        <StorageItem />
        <div className="w-[90%] mx-auto mt-3 flex justify-between">
          <button className="w-[45%] smaButtons">Adicionar</button>
          <button className="w-[45%] smaButtons">Salvar</button>
        </div>
      </div>
    )
  }
}