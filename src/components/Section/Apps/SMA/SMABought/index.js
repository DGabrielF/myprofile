import React, { Component } from "react";
import SMAForm from "../SMAForm";
import SMAFormButtons from "../SMAFormButtons";
import SMABoughtList from "../SMABoughtList";

export default class SMABought extends Component {
  state = {
    item: {
      name:"",
      company:"",
      price:"",
      quantity:1,
    },
    itemsList: [],
  }

  handleChangeInputs = (e) => {
    const {item} = this.state
    const { name, value } = e.currentTarget;
    this.setState({ item: {...item, [name]: value}})
  }

  dotDecimalValidate(value) {
    const regex = /^\d+(\.\d{1,2})?$/;
    const temPontoDecimal = (value.match(/\./g) || []).length > 1;
    return regex.test(value) && !temPontoDecimal;
  }

  priceInputRestriction = (e) => {
    const inputValue = e.currentTarget.value;
    const numberValue = inputValue.replace(/[^\d+(.\d{1,2})?$]/g,'');
    e.currentTarget.value = numberValue;
  }

  quantityInputRestriction = (e) => {
    const inputValue = e.currentTarget.value;
    let numberValue = inputValue.replace(/[^\d+(.\d{1,2})?$]/g,'');
    numberValue = numberValue.replace(/,/g, '.')
    e.currentTarget.value = numberValue;
  }

  handleQuantity = (e, amount) => {
    const {item} = this.state
    const clickParent = e.currentTarget.parentElement.parentElement;
    let newValue = Number(clickParent.querySelector(`[name=quantity]`).value) + amount
    newValue = (newValue <= 0) ? 0 : newValue
    this.setState({item: {...item, quantity: newValue}})
    clickParent.querySelector(`[name=quantity]`).value = newValue
  }

  handleListItems = (e) => {
    const { item } = this.state
    if (item.name === '') {
      console.log("Toastify: O produto necessita de um nome")
    } else if (item.quantity === 0) {
      console.log('Toastify: Como assim você comprou "zero" produto?')
    } else {
      this.setState((prevState) => ({
        itemsList: [...prevState.itemsList, item]
      }))
    }
  }

  handleDeleteItem = (e) => {
    const { itemsList } = this.state
    const parentDiv =(e.target.closest('.smaItemOfList'))
    const name = parentDiv.querySelector(`[name='name']`).innerText
    const company = parentDiv.querySelector(`[name='company']`).innerText
    const novaLista = itemsList.filter((item) => (item.name !== name || item.company !== company));
    this.setState({
      itemsList: [...novaLista]
    })
  }

  handleEditItem = (e) => {
    const { itemsList } = this.state
    const parentDiv =(e.target.closest('.smaItemOfList'))
    const name = parentDiv.querySelector(`[name='name']`).innerText
    const company = parentDiv.querySelector(`[name='company']`).innerText
    const quantity = parentDiv.querySelector(`[name='quantity']`).innerText
    const novaLista = itemsList.filter((item) => (item.name !== name || item.company !== company));
    document.querySelector(`.smaForm [name='name']`).value = name
    document.querySelector(`.smaForm [name='company']`).value = company
    document.querySelector(`.smaForm [name='quantity']`).value = quantity
    this.setState({
      item: {
        name: name,
        company:company,
        quantity:quantity,
      },
      itemsList: [...novaLista],
    })
  }
  

  handleSave = (e) => {
    console.log(this.state)
  }

  render() {
    const { itemsList } = this.state
    return (    
    <div className="w-full h-full">
      <div className="smaPageTitle">Título da página</div>
      <div className="smaSeparator"></div>
      <div className="boughhtItemsList">
      <SMABoughtList 
      itemsList={itemsList}
      handleDeleteItem={this.handleDeleteItem}
      handleEditItem={this.handleEditItem}
      />
      <div className="smaSeparator"></div>
      </div>
      <SMAForm 
      handleChangeInputs={this.handleChangeInputs}
      handleQuantity={this.handleQuantity}
      quantityInputRestriction={this.quantityInputRestriction}
      priceInputRestriction={this.priceInputRestriction}
      />
      <SMAFormButtons 
      handleListItems={this.handleListItems} 
      handleSave={this.handleSave}
      />
    </div>
    )
  }
}