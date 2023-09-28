import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function SMABoughtList({itemsList, handleDeleteItem, handleEditItem}) {
  let boughtList;
  if (Object.keys(itemsList).length !== 0) {
    boughtList = itemsList.map((item, index) => {
      return (
        <div className="smaItemOfList flex">
          <div name="name" className="w-[39%] min-w-[30px]">{item.name}</div>
          <div name="company" className="w-[39%] min-w-[30px]">{item.company}</div>
          <div className="w-[20%] min-w-[80px] flex justify-between">
            <div className="flex">
              <div name="quantity">{item.quantity}</div>
              &#x0028;
              <div name="unit"> {item.unit} </div>
              &#x0029;
            </div>
            <button
            onClick={(e) => handleEditItem(e)}>
              <FiEdit />
            </button>
            <button 
            onClick={(e) => handleDeleteItem(e)}
            className="text-black hover:text-orange-900">
              <FiTrash2 />
            </button>
          </div>
        </div>
      )})
  } else {
    boughtList = (
      <div className="flex justify-center">Suas compras aparecerão aqui</div>
    )
  }

  return (    
    
    <div className="smaList flex flex-col">
      {boughtList}
    </div>
  )
}