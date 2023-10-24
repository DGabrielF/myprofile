import React, { useEffect, useState } from "react";
import { FBFetchData } from "../../../../../firebase-config";
import { BiCheckSquare, BiRefresh, BiSquare } from "react-icons/bi";

export default function SMAShoppingList ({listId, handleStatistics}) {
  const [itemList, setItemList] = useState([]);
  const [stat, setStat] = useState(false);
  const [statList, setStatList] = useState([])
  const [toBeBought, setToBeBought] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [edit, setEdit] = useState(true);

  useEffect(() => {FBFetchData(setItemList, "SMA", listId, "List"); FBFetchData(setStatList, "SMA", listId, "Stat")}, []);

  const handleStat = (e, item) => (item.name !== stat)?setStat(item.name):setStat(false)

  const handleListItems = (e, item) => {
    boughtItems.find(obj => obj.name === item.name)?
    setBoughtItems(boughtItems.filter(obj => obj.name !== item.name)):
    setBoughtItems([...boughtItems, item]);
  }

  const handleSubmit = e => {
    console.log(boughtItems)
  }


  return (
    <div className="w-[99%] py-2 flex flex-col items-center gap-4">
      <div className="smaPageTitle">LISTA SUGERIDA</div>
      <div className="smaSeparator"></div>
      <div className="max-h-[93%] w-[95%] overflow-auto bg-orange-300 p-2 rounded-lg"> 
        <div className="w-fill flex justify-end items-center gap-3" onClick={e => handleStatistics(e, itemList, statList, setStatList)}>
          <div>Atualizar lista </div>
          <BiRefresh />
        </div>
        {statList.map((item, index) => {
          let styledClass = "px-1 bg-orange-200 text-start flex flex-wrap justify-between items-center font-semibold"
          if (index === 0) {
            styledClass += " rounded-ss-lg rounded-se-lg";
          } else if (index === itemList.length-1) {
            styledClass += " rounded-es-lg rounded-ee-lg";
          }
          return (
            <div key={item.id}>
              <div className={styledClass}>
                <div className="w-[90%]" onClick={e => handleStat(e, item)}>{`${item.name} (${item.company} ${item.unit})`}</div>
                {edit === item.name?
                <input className="w-[6%] text-center bg-orange-100 rounded-lg" onBlur={e => setEdit(false)} defaultValue={item.quantity}></input>:
                <div className="w-[6%] text-center"  onClick={e => setEdit(item.name)}>{item.quantity}</div>
                }
                <div className="w-[4%] flex items-center" onClick={e => handleListItems(e, item)}>
                  {boughtItems.find(obj => obj.name === item.name)?
                  <BiCheckSquare className="w-[20px] h-[20px]"/>:
                  <BiSquare className="w-[20px] h-[20px]"/>
                  }
                </div>
                {stat===item.name && item.mean?
                  <div className="bg-orange-100 w-[99%] mx-auto my-[2px] rounded-lg flex flex-col px-2 justify-around">
                    <div className="w-full flex justify-between">
                      <div>Menor valor</div>
                      <div>Valor médio</div>
                      <div>Maior valor</div>
                    </div>
                    <div className="w-full flex justify-between">
                      <div>{item.min}</div>
                      <div>{item.mean}</div>
                      <div>{item.max}</div>
                    </div>
                  </div>:
                <></>
                }
              </div>
            </div>
          )
        })}
      </div>
      <div className="smaSeparator"></div>
      <button className="smaButtons" onClick={e => handleSubmit(e)}>CONFIRMAR COMPRA</button>
      {/* {statList.map(item => (
        <div className="text-cyan-200 overflow-auto">
          <div>nome:{item.name}</div>
          <div>company:{item.company}</div>
          <div>unit:{item.unit}</div>
          <div>min:{item.min}</div>
          <div>mean:{item.mean}</div>
          <div>max:{item.max}</div>
          <div>occurrence:{item.occurrence}</div>
          <div>meanShoppingInterval:{item.meanShoppingInterval}</div>
        </div>
      ))} */}
    </div>
  )
}

