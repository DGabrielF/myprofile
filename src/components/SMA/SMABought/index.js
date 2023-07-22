import React, { Component } from "react";
import SMAForm from "../SMAForm";
import SMAFormButtons from "../../SMAFormButtons";
import SMABoughtList from "../SMABoughtList";

export default class SMABought extends Component {
  state = {
    item: {
      name:"",
      company:"",
      quantity:1,
    },
    itemsList: [],
  }

  handleChangeInputs = (e) => {
    const {item} = this.state
    const { name, value } = e.currentTarget;
    console.log(name)
    this.setState({ item: {...item, [name]: value}})
    console.log(this.state)
  }

  quantityInputRestriction = (e) => {
    const inputValue = e.currentTarget.value;
    const numberValue = inputValue.replace(/[^0-9]/g,'');
    e.currentTarget.value = numberValue;
  }

  handleQuantity = (e, amount) => {
    const {item} = this.state
    const clickParent = e.currentTarget.parentElement.parentElement;
    const quantityInput = clickParent.children[1];
    let newValue = Number(quantityInput.value) + amount
    newValue = (newValue <= 0) ? 0 : newValue
    this.setState({item: {...item, quantity: newValue}})
    quantityInput.value = newValue
  }

  handleListItems = (e) => {
    const { item, itemsList } = this.state
    console.log(item)
    if (item.name === '') {
      console.log("Toastify: O produto necessita de um nome")
    } else if (item.quantity === 0) {
      console.log('Toastify: Como assim você comprou "zero" produto?')
    } else {
      this.setState({itemsList: {...itemsList, item}})
    }
  }

  handleSave = (e) => {
    console.log(this.state)
  }

  render() {
    return (    
    <div className="w-full h-full">
      <div className="smaPageTitle">Título da página</div>
      <div className="smaSeparator"></div>
      <div className="boughhtItemsList">
      <SMABoughtList />
      <div className="smaSeparator"></div>
      </div>
      <SMAForm 
      handleChangeInputs={this.handleChangeInputs}
      handleQuantity={this.handleQuantity}
      quantityInputRestriction={this.quantityInputRestriction}
      />
      <SMAFormButtons 
      handleListItems={this.handleListItems} 
      handleSave={this.handleSave}
      />
    </div>
    )
  }
}