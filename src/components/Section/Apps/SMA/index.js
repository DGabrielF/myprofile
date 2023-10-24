import React, { useEffect, useState } from "react";
import { FBFetchData, db } from "../../../../firebase-config";

import SMAHome from "./SMAHome";
import SMABought from "./SMABought";
import SMASideBar from "./SMASideBar";
import SMAStorage from "./SMAStorage";
import SMASpendItem from "./SMASpendItem";
import SMAShoppingList from "./SMAShoppingList";
import SMALists from "./SMALists";
import SMAQuitList from "./SMAQuitList";

export default function SMA ({user}) {
  const [usersList, setUsersList] = useState([]);
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState({number: 0, name: "Início", show:"on"});
  const [listSelected, setListSelected] = useState("")
  const [sideBarItems, setSidebarItems] = useState([
    {number: 0, name: "Início" , show:"on"},
    {number: 1, name: "Listas", show:"on"},   
  ])

  useEffect(() => {FBFetchData(setUsersList, "Users")}, []);

  const handleQuantity = (e, amount, setFunction) => {    
    const clickParent = e.currentTarget.parentElement.parentElement;
    let newValue = Number(clickParent.querySelector(`[name=quantity]`).value) + amount
    newValue = (newValue <= 0) ? 0 : newValue
    setFunction(newValue)
    clickParent.querySelector(`[name=quantity]`).value = newValue
  }

  const quantityInputRestriction = (e, setFunction) => {
    const inputValue = e.currentTarget.value;
    let numberValue = inputValue.replace(/[^\d+(.\d{1,2})?$]/g,'');
    numberValue = numberValue.replace(/,/g, '.')
    e.currentTarget.value = numberValue;
    setFunction(numberValue)
  }

  const handleStatistics = async (e, itemList, statList, setStatList) => {
    const updatedStatList = [...statList];
    itemList.forEach(item => {
      const existingStatItem = updatedStatList.find(statItem =>
        statItem.name === item.name &&
        statItem.company === item.company &&
        statItem.unit === item.unit
      );

      if (existingStatItem) {
        if (Number(item.price) < Number(existingStatItem.min)) {existingStatItem.min = Number(item.price).toFixed(2)}
        if (Number(item.price) > Number(existingStatItem.max)) {existingStatItem.max = Number(item.price).toFixed(2)}
        existingStatItem.quantity += item.quantity
        existingStatItem.mean = ((Number(existingStatItem.mean) * Number(existingStatItem.occurrence) + Number(item.price)) / (Number(existingStatItem.occurrence) + 1)).toFixed(2);
        existingStatItem.occurrence += (item.quantity>0)?item.quantity:0;
      } else {
        const newStatItem = {
          name: item.name,
          company: item.company,
          unit: item.unit,
          quantity: item.quantity,
          min: item.price,
          mean: item.price,
          max: item.price,
          occurrence: item.quantity,
          meanShoppingInterval: 0,
        };
        updatedStatList.push(newStatItem);
      }
    });
    setStatList(updatedStatList);
  }
  
  let content;
    if (itemSelected.name === "Início") {
      content = (<SMAHome />)
    } else if (itemSelected.name === "Listas") {
      content = (
        <SMALists 
          user={user} 
          usersList={usersList}
          setListSelected={setListSelected}
          handleQuantity={handleQuantity} 
          quantityInputRestriction={quantityInputRestriction}
          setItemSelected={setItemSelected}
          setSidebarItems={setSidebarItems}
        />
      )
    } else if (itemSelected.name === "Entrada de itens") {
      content = (
        <SMABought
          listId={listSelected}
          handleQuantity={handleQuantity}
          quantityInputRestriction={quantityInputRestriction}
        />
      )
    } else if (itemSelected.name === "Estoque") {
      content = (
        <SMAStorage 
          listId={listSelected}
        />
      )
    } else if (itemSelected.name === "Saída de itens") {
      content = (
        <SMASpendItem 
          listId={listSelected}
        />
      )
    } else if (itemSelected.name === "Lista de compras") {
      content = (
        <SMAShoppingList 
          listId={listSelected} 
          handleStatistics={handleStatistics}
        />
      )
    } else if (itemSelected.name === "Sair da lista") {
      content = (
        <SMAQuitList
          setListSelected={setListSelected}
          setItemSelected={setItemSelected}
        />
      )
    }

  return (
    <div className="static h-full bg-zinc-800 flex justify-end">
      <SMASideBar
        sideBarIsOpen={sideBarIsOpen}
        setSideBarIsOpen={setSideBarIsOpen}
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
        sideBarItems={sideBarItems}
      />
      <div className="w-[94%]">
        {content}
      </div>
      </div>
  )
}
