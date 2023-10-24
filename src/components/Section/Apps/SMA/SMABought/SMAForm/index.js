import React from "react";
import { FaBalanceScale } from "react-icons/fa";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { PiCalendarLight } from "react-icons/pi"

export default function SMAForm({name, setName, company, setCompany, price, setPrice,
  quantity, setQuantity, unit, setUnit, day, setDay, month, setMonth, year, setYear, 
  handleQuantity, quantityInputRestriction}) {
  return (    
    <form className="smaForm">
      <div className="flex flex-wrap gap-x-2 gap-y-1 justify-around">
        <input name="name" placeholder="Produto"  value={name}
        onChange={(e) => setName(e.target.value)} 
        className="smaInputs min-w-[120px] max-w-[159px]"></input>
        <input name="company" placeholder="Marca" value={company}
        onChange={(e) => setCompany(e.target.value)} 
        className="smaInputs min-w-[120px] max-w-[159px]"></input>
        <div className="flex gap-1 min-w-[120px] max-w-[159px]">
          <div>R$/und</div>
          <input name="price" placeholder="1,99" value={price}
          onChange={(e) => quantityInputRestriction(e, setPrice)} 
          className="smaInputs min-w-[70px] max-w-[99px]"></input>
        </div>
        <div className="flex gap-1 min-w-[120px] max-w-[159px] justify-center items-center">
          <div className="flex gap-[2px]">
            <FaBalanceScale className="w-[23px] h-[23px]"/>
            <div>/und</div>
          </div>
          <input name="unit" placeholder="200g" value={unit}
          onChange={(e) => setUnit(e.target.value)} 
          className="smaInputs min-w-[75px] max-w-[90px]">
          </input>
        </div>
        <div className="flex gap-1 min-w-[120px] max-w-[159px] justify-center items-center">
          und
          <div>
            <FiMinusSquare 
            onClick={(e) => handleQuantity(e, -1, setQuantity)} 
            className="w-[23px] h-[23px]"/>
          </div>
          <input 
          name="quantity" defaultValue={1} value={quantity}
          onChange={(e) => quantityInputRestriction(e, setQuantity)} 
          className="smaInputs min-w-[50px] flex text-center">
          </input>
          <div>
            <FiPlusSquare 
            onClick={(e) => handleQuantity(e, 1, setQuantity)} 
            className="w-[23px] h-[23px]"/>
          </div>
        </div>
        <div className="flex gap-[2px] min-w-[120px] max-w-[159px] justify-center items-center">
          <div>
            <PiCalendarLight className="w-[23px] h-[23px]"/>
          </div>
          <input name="day" placeholder="01" defaultValue={ new Date().getDate()} value={day}
          onChange={(e) => setDay(e.target.value)} 
          className="smaInputs w-[37px] min-w-[37px]">
          </input>
          <input name="month" placeholder="01" defaultValue={ new Date().getMonth()+1} value={month}
          onChange={(e) => setMonth(e.target.value)} 
          className="smaInputs w-[37px] min-w-[37px]">
          </input>
          <input name="year" placeholder="2000" defaultValue={ new Date().getFullYear()} value={year}
          onChange={(e) => setYear(e.target.value)} 
          className="smaInputs w-[55px] min-w-[57px]">
          </input>
        </div>
      </div>
    </form>
  )
}