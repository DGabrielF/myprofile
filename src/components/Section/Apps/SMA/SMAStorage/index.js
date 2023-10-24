import React, { useEffect, useState } from "react";
import { FBFetchData } from "../../../../../firebase-config";
import { FaSearch } from "react-icons/fa";

export default function SMAStorage ({listId}) {
  const [itemList, setItemList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [stat, setStat] =useState(false);

  useEffect(() => {FBFetchData(setItemList, "SMA", listId, "Stat")}, []);

  const showedItems = [...itemList];

  const handleShowedList = (e) => setFilteredList(showedItems.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())))

  const handleStat = (e, item) => (item.name !== stat)?setStat(item.name):setStat(false)

  const teste = (e) => {
    console.log('itemList', itemList)
    console.log("showedItems", showedItems)
  }

  return (
    <div className="text-orange-500 w-full normal-text flex flex-col items-center">
      <div className="w-[98%] bg-orange-500 text-zinc-700 text-2xl font-extrabold rounded-se-xl rounded-es-xl my-2">
        ESTOQUE
      </div>
      <div className="smaSeparator"></div>
      <div className="w-[95%] my-1 flex justify-end items-center gap-2">
        <div onClick={e => teste(e)} className="flex justify-center items-center sm:gap-2">
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
        <div className="w-[99%] h-[650px] sm:w-[95%] overflow-auto bg-zinc-700 p-2 rounded-lg">
          {(filteredList.length === 0?showedItems:filteredList).map((item, index) => {
            let styledClass;
            if (index === 0) {
              styledClass = "bg-zinc-600 text-start flex flex-wrap rounded-ss-lg rounded-se-lg justify-between font-semibold";
            } else if (index === showedItems.length-1) {
              styledClass = "bg-zinc-600 text-start flex flex-wrap rounded-es-lg rounded-ee-lg justify-between font-semibold";
            } else { 
              styledClass = "bg-zinc-600 text-start flex flex-wrap justify-between font-semibold";
            }
              return (
                <div key={item.id} onClick={e => handleStat(e, item)}>
                  <div className={styledClass}>
                    <div className="w-[94%] pl-1">{`${item.name} (${item.company} ${item.unit})`}</div>
                    <div className="w-[6%] ">{item.quantity}</div>
                    {stat===item.name?
                    <div className="bg-zinc-500 w-[99%] mx-auto my-[2px] rounded-lg flex gap-2 justify-around">
                      <div>Menor valor {item.min}</div>
                      <div>Valor médio {item.mean}</div>
                      <div>Maior valor {item.max}</div>
                    </div>:<></>
                    }
                  </div>
                </div>
              )
            }
          )}
        </div>
        <div className="smaSeparator"></div>
      </div>
    </div>
  )
}