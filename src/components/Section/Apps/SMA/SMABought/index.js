import React, { useEffect, useState } from "react";
import SMAForm from "./SMAForm";
import SMAFormButtons from "./SMAFormButtons";
import SMABoughtList from "./SMABoughtList";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FBFetchData, db } from "../../../../../firebase-config";

export default function SMABought ({listId, handleQuantity, quantityInputRestriction}) {
  const [name, setName] =useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");
  const [day, setDay] = useState(new Date().getDate())
  const [month, setMonth] = useState(new Date().getMonth()+1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [itemsList, setItemsList] = useState([]);
  const [statList, setStatList] = useState([]);
  const [update, setUpdate] = useState(false)
  const coll = "SMA";

  useEffect(() => {FBFetchData(setStatList, "SMA", listId, "Stat")}, [update, listId]);

  const handleListItems = (e) => {
    if (name === '') {
      console.log("Toastify: O produto necessita de um nome")
    } else if (quantity === 0) {
      console.log('Toastify: Como assim você comprou "zero" produto?')
    } else if (unit === '') {
      console.log('Toastify: isso é em que unidade')
    } else {
      const existingItem = itemsList.find(obj =>
        obj.name === name &&
        obj.company === company &&
        obj.unit === unit
      );
      if (!existingItem) {
        setItemsList([...itemsList, {name, company, price, quantity, unit, day, month, year}]);
        setName("");
      } else {
        console.log("Esse item já foi adicionado à lista")
      }
    }
  }

  const handleSave = async (e) => {
    try {
      itemsList.map(async (item, index) => {
        await addDoc(collection(db, coll, listId, "List"), 
        {
          name: item.name,
          company:item.company,
          price:item.price,
          quantity:item.quantity,
          unit:item.unit,
          day:item.day,
          month:item.month,
          year:item.year,
        });

        const existingStatItem = statList.find(statItem =>
          statItem.name === item.name &&
          statItem.company === item.company &&
          statItem.unit === item.unit
        );

        if (!existingStatItem) {
          await addDoc(collection(db, coll, listId, "Stat"),
          {
            name: item.name,
            company: item.company,
            unit: item.unit,
            quantity: item.quantity,
            min: item.price,
            mean: item.price,
            max: item.price,
            occurrence: item.quantity,
            meanShoppingInterval: 0,
          });
          setUpdate(!update)
        } else {
          await updateDoc(doc(db, coll, listId, "Stat", existingStatItem.id),
          {
            quantity: existingStatItem.quantity + item.quantity,
            min: (Number(item.price) < Number(existingStatItem.min))?Number(item.price).toFixed(2):Number(existingStatItem.min).toFixed(2),
            mean: ((Number(existingStatItem.mean) * Number(existingStatItem.occurrence) + Number(item.price)) / (Number(existingStatItem.occurrence) + 1)).toFixed(2),
            max: (Number(item.price) > Number(existingStatItem.max))?Number(item.price).toFixed(2):Number(existingStatItem.max).toFixed(2),
            occurrence: Number(item.quantity)>0?Number(existingStatItem.occurrence)+Number(item.quantity):Number(existingStatItem.occurrence),
            meanShoppingInterval: 0,
          });
          setUpdate(!update)
        }
      })
      console.log('Dados enviados com sucesso')
      setItemsList([]);
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteItem = (e) => {
    const parentDiv =(e.target.closest('.smaItemOfList'))
    const name = parentDiv.querySelector(`[name='name']`).innerText
    const company = parentDiv.querySelector(`[name='company']`).innerText
    const novaLista = itemsList.filter((item) => (item.name !== name || item.company !== company));
    setItemsList([...novaLista])
  }
  
  const handleEditItem = (e, item) => {
    setName(item.name);
    setCompany(item.company);
    setPrice(item.price);
    setQuantity(item.quantity);
    setUnit(item.unit);
    setDay(item.day);
    setMonth(item.month);
    setYear(item.year);
    const newArray = itemsList.filter(obj => obj!==item)
    setItemsList([...newArray])
  }

  return (    
    <div className="w-full h-full">
      <div className="smaPageTitle ">COMPRAR</div>
      <div className="smaSeparator"></div>
        <SMAForm 
        name={name}
        setName={setName}
        company={company}
        setCompany={setCompany}
        price={price}
        setPrice={setPrice}
        quantity={quantity}
        setQuantity={setQuantity}
        unit={unit}
        setUnit={setUnit}
        day={day}
        setDay={setDay}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        handleQuantity={handleQuantity}
        quantityInputRestriction={quantityInputRestriction}
        />
        <SMAFormButtons 
        handleListItems={handleListItems} 
        handleSave={handleSave}
        />
      <div className="smaSeparator"></div>
      <div className="boughhtItemsList">
      <SMABoughtList 
      itemsList={itemsList}
      handleDeleteItem={handleDeleteItem}
      handleEditItem={handleEditItem}
      />
      <div className="smaSeparator"></div>
      </div>
    </div>
    )
}