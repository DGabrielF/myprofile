import React, { useEffect, useState } from "react";
import { FBFetchData, db } from "../../../../../firebase-config";
import SMAFormButtons from "./SMAFormButtons";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { FaBalanceScale } from "react-icons/fa";
import { PiCalendarLight } from "react-icons/pi";

export default function SMASpendItem ({listId}) {
  const [itemList, setItemList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredNameTips, setFilteredNameTips] = useState([]);
  const [name, setName] =useState("");
  const [company, setCompany] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");
  const [day, setDay] = useState(new Date().getDate())
  const [month, setMonth] = useState(new Date().getMonth()+1)
  const [year, setYear] = useState(new Date().getYear())

  const [error, setError] = useState('');
  
  const coll = "SMA";

  const showTips = (e, value, att) => {
    setInputValue(value);
    (e.target.parentElement.id === "name")?setName(value):setCompany(value);
    const crudeFilteredTips = itemList.filter((tip) => tip[att].toLowerCase().includes(value.toLowerCase()));
    const filteredTips = crudeFilteredTips.filter((value, indice, array) => array.indexOf(value) === indice);
    setFilteredNameTips(filteredTips);
  }

  const quantityInputRestriction = (e) => {
    const inputValue = e.currentTarget.value;
    let numberValue = inputValue.replace(/[^\d+(.\d{1,2})?$]/g,'');
    numberValue = numberValue.replace(/,/g, '.')
    e.currentTarget.value = numberValue;
  }

  const handleQuantity = (e, amount) => {
    const clickParent = e.currentTarget.parentElement.parentElement;
    let newValue = Number(clickParent.querySelector(`[name=quantity]`).value) + amount
    newValue = (newValue <= 1) ? 1 : newValue
    setQuantity(newValue)
    clickParent.querySelector(`[name=quantity]`).value = newValue
  }

  const selectTip = (tip) => {
    setInputValue(tip);
    setName(inputValue.name);
    setCompany(inputValue.company);
    setQuantity(inputValue.quantity);
    setUnit(inputValue.unit);
    setDay(inputValue.day);
    setMonth(inputValue.month);
    setYear(inputValue.year);
    setFilteredNameTips([]);
  }

  const arrayOfUniqueObjects = (array, att) => {
    const uniqueObjects = {};
    const uniqueObjectsArray = array.filter(obj => {
      if (!uniqueObjects[obj[att]]) {
        uniqueObjects[obj[att]] = true;
        return true;
      }
      return false;
    })
    return uniqueObjectsArray
  }

  const handleSubmit = async (e) => {
    setName(inputValue.name);
    setCompany(inputValue.company);
    setQuantity(inputValue.quantity);
    setUnit(inputValue.unit);
    setDay(inputValue.day);
    setMonth(inputValue.month);
    setYear(inputValue.year);
  }
  
  const handleSend = async (e) => {
    if (!itemList.some(obj => obj.name === name)) {
      return setError("Nenhum item no banco de dados possui esse nome")
    }
    if (!itemList.some(obj => obj.company === company)) {
      return setError("Ainda não há nenhum produto com esse nome da marca especificada")
    }
    try {
      await addDoc(collection(db, coll, listId, "List"),
      {
        name: name,
        company: company,
        quantity: -quantity,
        day: day,
        month: month,
        year: year,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleCleanEntries = e => {
    setName("");
    setCompany("");
    setQuantity("");
    setUnit("");
    setInputValue({name:'', company:'', quantity:1, unit:""});
  }
  
  useEffect(() => {FBFetchData(setItemList, "SMA", listId, "List")}, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="smaPageTitle text-center">PRODUTO CONSUMIDO</div>
      <div className="smaSeparator"></div>
      <div className="w-[95%] rounded-lg bg-orange-200 flex flex-col items-center py-2">
        <div className="flex flex-wrap gap-x-2 gap-y-1 justify-around">
          <input id="name" placeholder="Produto" className="smaInputs min-w-[120px] max-w-[159px]" value={inputValue.name} onChange={e => showTips(e, e.target.value, 'name')}></input>     
          <input id="company" placeholder="Marca" className="smaInputs min-w-[120px] max-w-[159px]" value={inputValue.company} onChange={e => showTips(e, e.target.value, 'company')}></input>
          <div className="flex min-w-[120px] max-w-[159px]">
            <div>
              <FiMinusSquare 
              onClick={(e) => handleQuantity(e, -1)} 
              className="w-[23px] h-[23px]"/>
            </div>          
            <input id="quantity" name="quantity" defaultValue={1} className="smaInputs min-w-[50px] flex text-center" onChange={(e) => quantityInputRestriction(e)} ></input>
            <div>
              <FiPlusSquare 
              onClick={(e) => handleQuantity(e, 1)} 
              className="w-[23px] h-[23px]"/>
            </div>
          </div>
          <div className="flex gap-1 min-w-[120px] max-w-[159px] justify-center items-center">
            <div className="flex gap-[2px]">
              <FaBalanceScale className="w-[23px] h-[23px]"/>
              <div>/und</div>
            </div>
            <input name="unit" placeholder="ml" value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="smaInputs min-w-[75px] max-w-[90px]">
            </input>
          </div>
          <div className="flex gap-[2px] min-w-[120px] max-w-[159px] justify-center items-center">
            <div>
              <PiCalendarLight className="w-[23px] h-[23px]"/>
            </div>
            <input name="day" placeholder="01" defaultValue={ new Date().getDate()}
            onBlur={(e) => setDay(e.target.value)} 
            className="smaInputs w-[37px] min-w-[37px]">
            </input>
            <input name="month" placeholder="01" defaultValue={ new Date().getMonth()+1}
            onBlur={(e) => setMonth(e.target.value)}
            className="smaInputs w-[37px] min-w-[37px]">
            </input>
            <input name="year" placeholder="2000" defaultValue={ new Date().getFullYear()}
            onBlur={(e) => setYear(e.target.value)} 
            className="smaInputs w-[55px] min-w-[57px]">
            </input>
          </div>
        </div>
      </div>
      <SMAFormButtons 
      handleCleanEntries={handleCleanEntries}
      handleSubmit={handleSubmit} 
      handleSend={handleSend}/>
      {(error !== '')?
      <div className="w-[95%]">
        <div className="smaSeparator w-full"></div>
        <div className="normal-text  text-red-600">{error}</div>
      </div>:
      <></>}
      <div className="smaSeparator"></div>
      <div className="normal-text text-orange-500">
        {(filteredNameTips.length !== 0 || itemList.length !== 0)?"ou selecione um item abaixo":"ainda não há itens"}
      </div>
      <div className="smaList flex flex-col overflow-auto">
        {
        (filteredNameTips.length !== 0)?
          arrayOfUniqueObjects(arrayOfUniqueObjects(arrayOfUniqueObjects(filteredNameTips,'name'),'company'),'unit').map((tip, index) => (
            <div key={index} onClick={() => selectTip(tip)} className="smaItemOfList bg-orange-200 rounded-lg text-center">
              {tip.name} {`(${tip.company} ${tip.unit})`}
            </div>)):
          arrayOfUniqueObjects(arrayOfUniqueObjects(arrayOfUniqueObjects(itemList,'name'),'company'),'unit').map((tip, index) => (
            <div key={index} onClick={() => selectTip(tip)} className="smaItemOfList bg-orange-200 rounded-lg text-center">
              {tip.name} {`(${tip.company} ${tip.unit})`}
            </div>))
        }
      </div>
    </div>
  )
}