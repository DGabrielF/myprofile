import React, { Component } from "react";
import SMAHome from "./SMAHome";
import SMABought from "./SMABought";
import SMASideBar from "./SMASideBar";
import SMAStorage from "./SMAStorage";
import SMASpendItem from "./SMASpendItem";

export default class SMA extends Component {
  state = {
    sideBarIsOpen: false,
    itemSelected: {number: 0, name: "Início"},
    sideBarItems: [
      {number: 0, name: "Início"},
      {number: 1, name: "Entrada de itens"},
      {number: 2, name: "Saída de itens"},
      {number: 3, name: "Estoque"},      
      {number: 4, name: "Lista de compras"},      
    ],
    sectionItems: [],
  }

  handleSideBar = (e) => {
    let { sideBarIsOpen } = this.state;
    this.setState({sideBarIsOpen: !sideBarIsOpen})
  }

  handlePage = (e) => {
    this.setState({itemSelected: {number: e.target.id, name: e.target.textContent}})
  }
  render() {
    const {sideBarIsOpen, itemSelected, sideBarItems} = this.state
    let page;
    if (itemSelected.name === "Início") {
      page = (<SMAHome />)
    } else if (itemSelected.name === "Entrada de itens") {
      page = (<SMABought />)
    } else if (itemSelected.name === "Estoque") {
      page = (<SMAStorage />)
    } else if (itemSelected.name === "Saída de itens") {
      page = (<SMASpendItem />)
    }
    return (
      <div className="h-full flex bg-zinc-800">
          <SMASideBar
          sideBarIsOpen={sideBarIsOpen}
          itemSelected={itemSelected}
          sideBarItems={sideBarItems}
          handleSideBar={this.handleSideBar}
          handlePage={this.handlePage}
        />
        {page}
      </div>
    )
  }
}