import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function StockList ({
  item, userDB,
  setListSelected, setSidebarItems, editMode, setEditMode, createMode, setCreateMode, allowed, setAllowed, listName, setListName, refresh, setRefresh, setItemSelected,
  handleDeleteList, handleAllowed, handleEditList}) {

  return (
    <>
      {userDB.id === item.owner || item.allowed.includes(userDB.id)?
      <div className="item-list bg-orange-100 hover:bg-orange-50 flex flex-col py-2">
        <div className="item-list bg-orange-100 hover:bg-orange-50">
          <div className="w-full text-left"
          onClick={e => {
            setListSelected(item.id);
            setItemSelected({number: 2, name: "Entrada de itens", show:""});
            setSidebarItems([
              {number: 0, name: "Início" , show:"on"},
              {number: 1, name: "Listas", show:"on"},
              {number: 2, name: "Entrada de itens", show:""},
              {number: 3, name: "Saída de itens", show:""},
              {number: 4, name: "Estoque", show:""},      
              {number: 5, name: "Lista de compras", show:""},    
              {number: 6, name: "Sair da lista", show:""} ])}}>
            {item.listName}
          </div>
          <div className="flex gap-2">
            <FiEdit
            className="text-blue-600"
            onClick={e => {
              setEditMode(editMode === item.id?"":item.id);
              setCreateMode(editMode === item.id?createMode:false);
              setAllowed(item.allowed)
            }}
            />
            <FiTrash2
            className="text-red-600"
            onClick={e => handleDeleteList(e, item)}
            />          
          </div>
        </div>
        {editMode===item.id?
        <div>
          <div className="smaSeparator w-full"></div>
          <div>
            <input placeholder="Renomear lista" className="smaInputs w-[98%] mb-1" onChange={e=>setListName(e.currentTarget.value)}/>
            <div className="max-h-[120px] overflow-auto">
              {
                userDB?
                userDB.friendsList.map((friend, index) => (
                  <div key={friend.name} className="item-list bg-orange-100 hover:bg-orange-50 ">
                    <div>{friend.name}</div>
                    <input type="checkbox" checked={allowed.includes(friend.uid)} onChange={e=>handleAllowed(e, friend.uid)}/>
                  </div>
                )):
                (
                  <div className="text-red-600">
                    Para usar a lista no modo colaborativo você deve estar logado
                  </div>
                )
              }

            </div>
          </div>
          <div className="smaSeparator w-full"></div>
          <div className="flex gap-3 justify-center">
            <button className="smaButtons w-[46%]"
            onClick={e => {
              listName!==""?handleEditList(e, item):handleEditList(e);
              setEditMode("");
              setRefresh(!refresh);
            }}
            >
              Alterar
            </button>
            <button className="smaButtons w-[46%]"
            onClick={e => {
              setEditMode("");
              setListName("");
              setAllowed([]);
              setEditMode("")}}
            >
              Cancelar
            </button>
          </div>
        </div>:
        <></>}
      </div>
      :<></>}
    </>
  )
}