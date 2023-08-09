import React from "react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";

export default function SMAForm({handleChangeInputs, handleQuantity, quantityInputRestriction, priceInputRestriction}) {

  return (    
    <form className="smaForm">
      <div className="flex justify-between">
        <input 
        name="name" placeholder="Produto" 
        onChange={(e) => handleChangeInputs(e)} 
        className="smaInputs w-[49%] min-w-[30px]">
        </input>
        <input 
        name="company" placeholder="Marca" 
        onChange={(e) => handleChangeInputs(e)} 
        className="smaInputs w-[49%] min-w-[30px]">
        </input>
      </div>
    <div className="flex justify-between">
      <div>R$</div>
      <input name="price" placeholder="1,99" 
      onChange={(e) => priceInputRestriction(e)} 
      className="smaInputs w-[39%] min-w-[30px]">
      </input>
      <div>
        <FiMinusSquare 
        onClick={(e) => handleQuantity(e, -1)} 
        className="w-[135%] translate-x-[-25%] h-[135%] translate-y-[-12%]"/>
      </div>
      <input 
      name="quantity" defaultValue={1} 
      onChange={(e) => quantityInputRestriction(e)} 
      className="smaInputs w-[30%]  flex text-center">
      </input>
      <div>
        <FiPlusSquare 
        onClick={(e) => handleQuantity(e, 1)} 
        className="w-[135%] translate-x-[-25%] h-[135%] translate-y-[-12%]"/>
      </div>
    </div>
  </form>
  )
}