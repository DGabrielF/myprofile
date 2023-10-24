import React from "react";
import { FaBalanceScale } from "react-icons/fa";
import { FiEdit, FiMinusSquare, FiPlusSquare, FiTrash2 } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";

export default function CreateStock ({
  userDB,
  setListName, itemsList, setItemsList, name, setName, company, setCompany,
  unit, setUnit, handleQuantity, quantity, setQuantity, handleItemsList, handleSave, setCreateMode, createMode,
  handleAllowed, handleEditItem, quantityInputRestriction}) {
  return (
    <div className="w-full">
      <div>
        <div className="list bg-orange-300 my-2">
        <input className="smaInputs min-w-[50px]" placeholder="Nome da lista" onChange={e=>setListName(e.currentTarget.value)}/>
        <div className="smaSeparator"></div>
        <div>Colaboradores</div>
        <div className="list-container max-h-[120px] overflow-auto">
          {
            userDB?
            userDB.friendsList.map((item, index) => (
              <div key={item.name} className="item-list bg-orange-100 hover:bg-orange-50 ">
                <div>{item.name}</div>
                <input type="checkbox" onChange={e=>handleAllowed(e, item.uid)}/>
              </div>
            )):
            (
              <div className="text-red-600">
                Para usar a lista no modo colaborativo você deve estar logado
              </div>
            )
          }
        </div>
        <div className="smaSeparator"></div>
        <div>O que você já possui?</div>
        <div className="list-container max-h-[120px] overflow-auto">
          {
            itemsList.map((item, index) => (
              <div key={item.uid} className="item-list bg-orange-100 hover:bg-orange-50">
                  <div>{item.name}</div>
                  <div className="flex gap-2 items-center">
                    <div>{item.quantity}</div>
                    <FiEdit className="text-blue-600" onClick={e => handleEditItem(e, item)} />
                    <FiTrash2 className="text-red-600" onClick={e => setItemsList(itemsList.filter(obj => obj !== item))} />
                  </div>
              </div>
            ))
          }
        </div>
        <div className="item-list py-[3px] bg-orange-100 hover:bg-orange-50 flex flex-wrap">
          <input name="name" placeholder="Nome" value={name}
          onChange={e => setName(e.target.value)} 
          className="smaInputs min-w-[110px] max-w-[137px] h-[80%]"
          />
          <input name="company" placeholder="Marca" value={company}
          onChange={(e) => setCompany(e.target.value)} 
          className="smaInputs min-w-[110px] max-w-[137px] h-[80%]"
          />
          <div className="flex gap-2 items-center">
            <div className="flex gap-[2px]">
              <FaBalanceScale className="w-[23px] h-[23px]"/>
              <div>/und</div>
            </div>
            <input name="unit" placeholder="200g" value={unit}
            onChange={(e) => setUnit(e.target.value)} 
            className="smaInputs min-w-[75px] max-w-[90px] h-[80%]"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiMinusSquare
            onClick={(e) => handleQuantity(e, -1, setQuantity)} 
            className="w-[23px] h-[23px]"/>
            <input 
            name="quantity" defaultValue={1} value={quantity}
            onChange={e => quantityInputRestriction(e, setQuantity)}
            className="smaInputs w-[40px] h-[80%] my-[3px] flex text-center"
            />
            <FiPlusSquare
            onClick={(e) => handleQuantity(e, 1, setQuantity)} 
            className="w-[23px] h-[23px]"
            />
          </div>
          <div className="smaButtons sm:max-w-none items-center justify-center flex gap-3 flex-1" onClick={e => handleItemsList(e)}>
            Guardar Item
            <GiCheckMark className="w-[25px] h-[25px]"/>
          </div>
        </div>
        <div className="smaSeparator"></div>
        <div className="w-[95%] flex justify-between gap-2">
          <button className="smaButtons" onClick={e=>handleSave(e)}>
            CRIAR
          </button>
          <button className="smaButtons hover:bg-red-300" onClick={e=>setCreateMode(!createMode)}>
            CANCELAR
          </button> 
        </div>
        </div>
      </div>
    </div>
  )
}