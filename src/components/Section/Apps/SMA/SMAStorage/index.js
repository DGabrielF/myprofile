import React, { useEffect, useState } from "react";
import { FBFetchData } from "../../../../../firebase-config";

export default function SMAStorage () {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {FBFetchData(setItemList, "SMA")}, []);
  const showedItems = {};
  itemList.forEach(objeto => {
    const { name, unit, quantity } = objeto;

    if (showedItems[name] === undefined) {
      
      showedItems[name] = Number(quantity);
    } else {
      showedItems[name] += Number(quantity);
    }
  });

  const resultadoArray = Object.entries(showedItems).map(([name, quantity]) => ({ name, quantity }));

  return (
    <div className="text-orange-500 w-full normal-text">
      <div className="text-2xl font-extrabold">
        ESTOQUE
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-bold flex justify-between gap-2">
          <div>
            PRODUTO
          </div>
          <div>
            QUANTIDADE
          </div>
        </div>
        <div className=" overflow-auto">
          {resultadoArray.map((item, index) => {
            return (
              <div key={item.id} className="flex justify-between font-normal">
                <div>{item.name}</div>
                <div>{item.quantity}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}