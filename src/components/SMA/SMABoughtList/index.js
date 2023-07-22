import React from "react";
import { FiEdit } from "react-icons/fi";

export default function SMABoughtList(itemsList) {
  let boughtList;
  console.log('itemsList', itemsList, typeof itemsList)
  console.log(Object.keys(itemsList).length)
  if (Object.keys(itemsList).length !== false) {
    boughtList = (
      <div>Suas compras aparecerão aqui (falso)</div>
    )
  } else {
    boughtList = (
      <div>Suas compras aparecerão aqui (verdadeiro)</div>
    )
  }
  if (Object.keys(itemsList).length > 0) {
    boughtList = itemsList.map((item, index) => {
      return (
        <div>
          <div className="w-[39%] min-w-[30px]">{item.name}</div>
          <div className="w-[39%] min-w-[30px]">{item.company}</div>
          <div className="w-[20%] min-w-[80px] flex justify-between">
            <div>{item.quantity}</div>
            <button>
              <FiEdit />
            </button>
          </div>
        </div>
      )})
  } else {
    boughtList = (
      <div>Suas compras aparecerão aqui</div>
    )
  }
  return (    
    
    <div className="smaForm">
      {boughtList}
    </div>
  )
}