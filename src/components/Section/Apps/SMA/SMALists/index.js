import { doc, addDoc, collection, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FBFetchData, db } from "../../../../../firebase-config";
import StockList from "./StocksList";
import CreateStock from "./CreateStock";

export default function SMALists ({user, usersList, setListSelected, handleQuantity, quantityInputRestriction, setItemSelected, setSidebarItems}) {
  const [createMode, setCreateMode] = useState(false);
  const [listName, setListName] = useState("");
  const [editMode, setEditMode] = useState("")
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [company, setCompany] = useState("");
  const [allowed, setAllowed] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [yourLists, setYourLists] = useState([]);
  const [refresh, setRefresh] = useState(false)
  
  useEffect(() => {FBFetchData(setYourLists, "SMA")}, [refresh]);

  const userDB = usersList.find(item => item.id === user.uid);

  const handleAllowed = (e, uid) => {
    if (e.target.checked && !allowed.includes(uid))
    { setAllowed([...allowed, uid])}
    else if (!e.target.checked && allowed.includes(uid)) 
    { setAllowed(allowed.filter(item => item!==uid))}
  }

  const handleItemsList = e => {
    if (name.length !== 0) {
      setItemsList([...itemsList, {name:name, company:company, quantity:quantity, unit:unit}]);
      setName("")
    }
  }

  const handleEditItem = (e, item) => {
    setName(item.name);
    setCompany(item.company)
    setQuantity(item.quantity);
    setUnit(item.unit);
    setItemsList(itemsList.filter(obj => obj !== item));
  }

  const handleEditList = async (e, item) => {
    if (listName !== "") {
      if (user.uid === item.owner) {
        await updateDoc(doc(db, "SMA", item.id), {
          listName: listName,
          allowed: allowed,
        });
        setListName("");
        setAllowed([]);
      }
    }
  }

  const handleDeleteList = async (e, item) => {
    try {
      setYourLists(yourLists.filter(obj => obj !== item))
      await deleteDoc(doc(db, "SMA", item.id));
    } catch (error) {
      console.log(error)
    }
  }

  const handleSave = async e => {    
    if (listName.length !== 0) {
      try {
        const docRef = await addDoc(collection(db, "SMA"),{
          owner: user.uid,
          listName: listName,
          allowed: allowed,
        })
        const DB = doc(db, "SMA", docRef.id);
        itemsList.map( async (item) => {
          await addDoc(collection(DB, "List"),
          {
            name: item.name,
            company:item.company,
            quantity:item.quantity,
            unit:item.unit,
          });
          await addDoc(collection(DB, "Stat"),
          {
            name: '',
            company:item.company,
            quantity:item.quantity,
            unit:item.unit,
          }
          )
        })        
        setRefresh(!refresh);
        setCreateMode(false);
    } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="text-orange-500 w-full normal-text flex flex-col items-center">
      <div className="w-[95%] bg-orange-500 text-zinc-700 text-2xl font-extrabold rounded-se-xl rounded-es-xl my-2">
        LISTAS
      </div>
      <div className="smaSeparator"></div>
      <div className="list bg-orange-300 my-2">
        <div>{yourLists.length>0?"Suas Listas":"Crie uma lista"}</div>       
        <div className={editMode === ""?"w-[95%] max-h-[160px] overflow-auto flex flex-col justify-between items-center":"w-[95%] max-h-[280px] overflow-auto flex flex-col justify-between items-center"}>
          {yourLists.map((item) => 
            <StockList
            item={item}
            userDB={userDB}
            setListSelected={setListSelected}
            setSidebarItems={setSidebarItems}
            editMode={editMode}
            setEditMode={setEditMode}
            createMode={createMode}
            setCreateMode={setCreateMode}
            allowed={allowed}
            setAllowed={setAllowed}
            listName={listName}
            setListName={setListName}
            refresh={refresh}
            setRefresh={setRefresh}
            setItemSelected={setItemSelected}
            handleDeleteList={handleDeleteList}
            handleAllowed={handleAllowed}
            handleEditList={handleEditList}
            />)}
        </div>
      </div>
      <div className="smaSeparator"></div>
      {
        createMode?
        <CreateStock 
        userDB={userDB}
        setListName={setListName}
        itemsList={itemsList}
        setItemsList={setItemsList}
        name={name}
        setName={setName}
        company={company}
        setCompany={setCompany}
        unit={unit} 
        setUnit={setUnit} 
        handleQuantity={handleQuantity} 
        quantity={quantity} 
        setQuantity={setQuantity} 
        handleItemsList={handleItemsList} 
        handleSave={handleSave} 
        setCreateMode={setCreateMode} 
        createMode={createMode}
        handleAllowed={handleAllowed}
        handleEditItem={handleEditItem}
        quantityInputRestriction={quantityInputRestriction}
        />:
        <button onClick={e=>{
          setCreateMode(true);
          setEditMode("");
          setListName("");
          setAllowed([])
          }}>
          Adicionar Nova lista
        </button>     
      }
    </div>
  )
}