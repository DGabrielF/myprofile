import React from "react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";


export default function StorageItem({name, company, quantity}) {
  function handleQuantity(e) {
    const clickParent = e.target.parentNode
    console.log(clickParent)
    console.log(clickParent.input)

    // identificar qual é o pai do botão clicado
    // procurar por um input
    // adicionar o incremento no valor    
  }
  return (    
    <div className="w-[98%] mx-2 flex justify-between items-center">
      <input 
      placeholder= "Produto"
      className="w-[35%] h-[70%] smaInputs "
      alue={name ? name : ""}
      />
      <input 
      placeholder="Marca"
      className="w-[35%] h-[70%] smaInputs"
      />
      <div
      className="w-[28%] flex items-center justify-end">
        <FiMinusSquare onClick={(e) => handleQuantity(e)}/>
        <input defaultValue="1" className="w-[70%] text-center"/>
        <FiPlusSquare />
      </div>
    </div>
  )
}