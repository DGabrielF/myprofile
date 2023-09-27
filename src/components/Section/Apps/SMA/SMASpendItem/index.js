import React, { useEffect, useState } from "react";
import { FBFetchData, db } from "../../../../../firebase-config";
import SMAFormButtons from "./SMAFormButtons";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { addDoc, collection } from "firebase/firestore";
import { FaBalanceScale } from "react-icons/fa";
import { PiCalendarLight } from "react-icons/pi";

export default function SMASpendItem () {
  const [itemList, setItemList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredNameTips, setFilteredNameTips] = useState([]);
  const [spendItem, setSpendItem] = useState({
    name: "",
    company: "",
    quantity: "",
    unit: "",
    day: new Date().getDate(),
    month: new Date().getMonth()+1,
    year: new Date().getYear(),
  });

  const [error, setError] = useState('');
  
  const coll = "SMA";

  const showTips = (e, value, att) => {
    setInputValue(value);
    (e.target.parentElement.id === "name")?setSpendItem({...spendItem, name: value}):setSpendItem({...spendItem, company: value})
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
    setSpendItem({...spendItem, quantity: newValue})
    clickParent.querySelector(`[name=quantity]`).value = newValue
  }

  const selectTip = (tip) => {
    setInputValue(tip);
    setSpendItem({...spendItem, name: inputValue.name, company: inputValue.company, unit: inputValue.unit})
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
    setSpendItem({name: inputValue.name, company: inputValue.company, quantity:spendItem.quantity, unit:spendItem.unit});  
  }
  
  const handleSend = async (e) => {
    if (!itemList.some(obj => obj.name === spendItem.name)) {
      return setError("Nenhum item no banco de dados possui esse nome")
    }
    if (!itemList.some(obj => obj.company === spendItem.company)) {
      return setError("Ainda não há nenhum produto com esse nome da marca especificada")
    }
    try {
      await addDoc(collection(db, coll),
      {
        name: spendItem.name,
        company: spendItem.company,
        quantity: -spendItem.quantity,
        day: spendItem.day,
        month: spendItem.month,
        year: spendItem.year,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleCleanEntries = e => {
    setSpendItem({name:'', company:'', quantity:'', unit:""});
    setInputValue({name:'', company:'', quantity:1, unit:""});
  }
  
  useEffect(() => {FBFetchData(setItemList, "SMA")}, []);
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
            <input name="unit" placeholder="ml" 
              onChange={(e) => setSpendItem({...spendItem, unit: e.target.value})}
              className="smaInputs min-w-[75px] max-w-[90px]">
            </input>
          </div>
          <div className="flex gap-[2px] min-w-[120px] max-w-[159px] justify-center items-center">
            <div>
              <PiCalendarLight className="w-[23px] h-[23px]"/>
            </div>
            <input name="day" placeholder="01" defaultValue={ new Date().getDate()}
            onBlur={(e) => setSpendItem({...spendItem, day: e.target.value})} 
            className="smaInputs w-[37px] min-w-[37px]">
            </input>
            <input name="month" placeholder="01" defaultValue={ new Date().getMonth()+1}
            onBlur={(e) => setSpendItem({...spendItem, month: e.target.value})}
            className="smaInputs w-[37px] min-w-[37px]">
            </input>
            <input name="year" placeholder="2000" defaultValue={ new Date().getFullYear()}
            onBlur={(e) => setSpendItem({...spendItem, year: e.target.value})} 
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
      <div className="normal-text">
        {(filteredNameTips.length !== 0 || itemList.length !== 0)?"pode selecionar um item abaixo":"ainda não há itens"}
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