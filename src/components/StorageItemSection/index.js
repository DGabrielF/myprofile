import React, { useState } from "react";
import StorageItem from "../StorageItem";
import StorageItemList from "../StorageItemList";

export default function StorageItemSection({action}) {
  const [productList, setProductList] = useState({
    listOfProducts: [''],
    selectedItem: {
      name:"",
      company:"",
      quantity:"",}
  })

  function handleSelectedItemsList(storageItemSelected) {
    let {listOfProducts} = productList
    console.log(productList)
    setProductList({listOfProducts: [...listOfProducts, storageItemSelected]})

    console.log(productList)
  }

  let section;
  let title;
  if (action === "buy") {
    title = "Adicionar produto(s) ao estoque"
  } else if (action === "waste") {
    title = "Produto(s) consumidos do estoque"
  } 

  return (    
  <div>
    <div className="text-center text-2xl pb-2">
      {title}
    </div>
    <StorageItemList 
    productList={productList}
    />
    <StorageItem 
    productList={productList}
    setProductList={handleSelectedItemsList}
    />
  </div>
  )
}