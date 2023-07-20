import React, { useState } from "react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";


export default function StorageItem({name, company, quantity, productList, handleSelectedItemsList}) {
  const [product, setProduct] = useState({
    name: name ? name : "",
    company: company ? company : "",
    quantity: quantity ? quantity : "1",
  })
  
  function handleChangeInputs(e) {
    const { name, value } = e.currentTarget;
    setProduct({...product, [name]: value})
  }

  function quantityInputRestriction(e) {
    const inputValue = e.currentTarget.value;
    const numberValue = inputValue.replace(/[^0-9]/g,'');
    e.currentTarget.value = numberValue;
  }

  function handleQuantity(e, amount) {
    const clickParent = e.currentTarget.parentElement;
    const quantityInput = clickParent.children[1];
    if (Number(quantityInput.value) + Number(amount) > 0) {
      quantityInput.value = Number(quantityInput.value) + Number(amount)
    } else {quantityInput.value = 0} 
    setProduct({ ...product, [quantity]: quantityInput})
  }

  function handleSubmit(e, productList) {
    e.preventDefault();
    const{ listOdProducts } = productList;
    console.log(listOdProducts)
    if (product.name === '') {
      console.log('empty')
    } else {
      console.log('dados do produto', product)
      const newProduct = () => handleSelectedItemsList(product)

      // let listedItems = document.querySelector(".listedItems")
      // console.log(listedItems)
      // listedItems.innerHTML += 
      // `
      // <div class="w-[80%] mx-auto py-1 flex justify-between items-center">
      //   <div>${product.name}</div>
      //   <div>${product.company}</div>
      //   <div>${product.quantity}</div>
      //   <button>
      //     <svg 
      //       stroke="currentColor" fill="none" stroke-width="2" 
      //       viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
      //       height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      //     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      //       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      //     </svg>
      //   </button>
      // </div>
      // `
    }
  }

  
  const line = (
    <div className="w-[98%] mx-2 flex justify-between items-center">
      <input 
      name="name"
      placeholder="Produto"
      className="w-[35%] h-[70%] smaInputs "
      defaultValue={name ? name : ""}
      onChange={(e)=>handleChangeInputs(e)}
      />
      
      <input 
      name="company"
      placeholder="Marca"
      className="w-[35%] h-[70%] smaInputs"
      defaultValue={company ? company : ""}
      onChange={(e)=>handleChangeInputs(e)}
      />
      <div
      className="w-[28%] flex items-center justify-end">
        <FiMinusSquare onClick={(e) => handleQuantity(e, -1)}/>        
        <input
        onChange={(e) => quantityInputRestriction(e)}
        defaultValue={quantity ? quantity : "1"} 
        className="w-[70%] text-center"/>
        <FiPlusSquare onClick={(e) => handleQuantity(e, 1)}/>
      </div>
    </div>
  )
  
  return (
    <form className="storageItem">
      {line}
      <div className="w-[90%] mx-auto mt-3 flex justify-between">
          <button 
          onClick={(e) => handleSubmit(e, productList)}
          className="w-[45%] smaButtons">Adicionar</button>
          <button className="w-[45%] smaButtons">Salvar</button>
        </div>
    </form>
  )
}