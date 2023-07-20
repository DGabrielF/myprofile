import React, { Component } from "react";
import SMAHome from "../SMAHome";
import SMASideBar from "../SMASideBar";

export default class SMASection extends Component {
  state = {
    sideBarIsOpen: false,
    itemSelected: {number: 0, name: "Início"},
    sideBarItems: [
      {number: 0, name: "Início"},
      {number: 1, name: "Entrada de itens"},
      {number: 2, name: "Saída de itens"},
      {number: 3, name: "Estoque"},      
      {number: 4, name: "Lista de compras"},      
    ]
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
      page = (
        <SMAHome />
      )
    }
    return (
      <div className="pt-8 flex">
        <div className="fixed">
          <SMASideBar
          sideBarIsOpen={sideBarIsOpen}
          itemSelected={itemSelected}
          sideBarItems={sideBarItems}
          handleSideBar={this.handleSideBar}
          handlePage={this.handlePage}
        />
        </div>
        {page}
      </div>
    )
  }
}