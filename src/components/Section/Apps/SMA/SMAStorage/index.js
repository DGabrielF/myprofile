import React, { useEffect, useState } from "react";
import { FBFetchData } from "../../../../../firebase-config";
import { FaSearch } from "react-icons/fa";

export default function SMAStorage () {
  const [itemList, setItemList] = useState([]);
  const [filteredList, setFilteredList] = useState([])

  useEffect(() => {FBFetchData(setItemList, "SMA")}, []);

  const showedItems = [];

  itemList.forEach(item => {
    const { name, company, unit, quantity, price } = item;
    const findName = showedItems.find(obj => obj.name === name)
    if (findName === undefined) {
      showedItems.push({ name: name, company: company, unit: unit, quantity: quantity, occurrences: 1, maxPrice: price, minPrice: price, meanPrice: price, totalSpend: price })
    } else {
      if (findName.company === company && findName.unit === unit) {
        findName.quantity += Number(quantity);
        if (price !== undefined) {
          findName.occurrences += quantity;
          findName.totalSpend += Number(price);
          findName.maxPrice = Number(price)>Number(findName.maxPrice)?price:findName.maxPrice;
          findName.minPrice = Number(price)>Number(findName.minPrice)?price:findName.minPrice;
          findName.meanPrice = findName.totalSpend/findName.occurrences
        }
      } else {
        showedItems.push({ name: name, company: company, unit: unit, quantity: quantity, occurrences: 1, maxPrice: price, minPrice: price, meanPrice: price, totalSpend: price })
      }
    }
  });

  const handleShowedList = (e) => {
    setFilteredList(showedItems.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  return (
    <div className="text-orange-500 w-full normal-text flex flex-col items-center">
      <div className="w-[98%] bg-orange-500 text-zinc-700 text-2xl font-extrabold rounded-se-xl rounded-es-xl my-2">
        ESTOQUE
      </div>
      <div className="smaSeparator"></div>
      <div className="w-[95%] my-1 flex justify-end items-center gap-2">
        <div className="flex justify-center items-center sm:gap-2">
          <div className="w-0 sm:w-full text-zinc-800 sm:text-orange-500">BUSCA</div>
          <FaSearch className="w-[22px] h-[22px]"/>
        </div>
        <input className="smaInputs w-[99%] min-w-[150px] max-w-[300px]" onChange={e => handleShowedList(e)}></input>
      </div>
      <div className="smaSeparator"></div>
      <div className="w-full flex flex-col gap-2 items-center">
        <div className="w-[93%] font-bold flex justify-between gap-2">
          <div>
            PRODUTO
          </div>
          <div>
            QUANTIDADE
          </div>
        </div>
        <div className="w-[99%] sm:w-[95%] overflow-auto bg-zinc-700 p-2 rounded-lg">
          {(filteredList.length === 0?showedItems:filteredList).map((item, index) => {
            if (index === 0) {
              return (
              <div key={item.id} className="text-start flex justify-between font-semibold">
                <div className="w-[94%] pl-1 bg-zinc-600 rounded-ss-lg">{`${item.name} (${item.company} ${item.unit})`}</div>
                <div className="w-[6%] bg-zinc-600 rounded-se-lg">{item.quantity}</div>
                <div className="w-[6%] bg-zinc-600 rounded-se-lg">{item.maxPrice}</div>
              </div>
              )
            } else if (index === showedItems.length-1) {
              return (
                <div key={item.id} className="text-start flex justify-between font-semibold">
                  <div className="w-[94%] pl-1 bg-zinc-600 rounded-es-lg">{`${item.name} (${item.company} ${item.unit})`}</div>
                  <div className="w-[6%] bg-zinc-600 rounded-ee-lg">{item.quantity}</div>
                  <div className="w-[6%] bg-zinc-600 rounded-se-lg">{item.maxPrice}</div>
                </div>
              )
            } else {
              return (
                <div key={item.id} className="text-start flex justify-between font-semibold">
                  <div className="w-[94%] pl-1 bg-zinc-600">{`${item.name} (${item.company} ${item.unit})`}</div>
                  <div className="w-[6%] bg-zinc-600">{item.quantity}</div>
                  <div className="w-[6%] bg-zinc-600">{item.maxPrice}</div>
                </div>
              )
            }
          })}
        </div>
        <div className="smaSeparator"></div>
      </div>
    </div>
  )
}