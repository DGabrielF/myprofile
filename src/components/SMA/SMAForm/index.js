import React from "react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";

export default function SMAForm({handleChangeInputs, handleQuantity, quantityInputRestriction}) {

  return (    
    <form className="smaForm">
    <input name="name" placeholder="Produto" onChange={(e) => handleChangeInputs(e)} className="smaInputs w-[39%] min-w-[30px]"></input>
    <input name="company" placeholder="Marca" onChange={(e) => handleChangeInputs(e)} className="smaInputs w-[39%] min-w-[30px]"></input>
    <div className="w-[20%] min-w-[80px] flex justify-around">
      <div><FiMinusSquare onClick={(e) => handleQuantity(e, -1)} className="w-[135%] translate-x-[-25%] h-[135%] translate-y-[-12%]"/></div>
      <input name="quantity" defaultValue={1} onChange={(e) => quantityInputRestriction(e)} className="smaInputs w-[90%] flex text-center"></input>
      <div><FiPlusSquare onClick={(e) => handleQuantity(e, 1)} className="w-[135%] h-[135%] translate-y-[-12%]"/></div>
    </div>
  </form>
  )
}