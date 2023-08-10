import React from "react";


export default function EditArea({setName, setAcronym, setDescription, setImage, setPage, handleSubmit, handleDelete, item, openedItem, editMode}) {
  let editArea;
  if (openedItem === item.id && editMode === true) {
    editArea = (
      <div id={item.id}>
        <input className="inputs" placeholder="Nome do aplicação" onChange={e => setName(e.currentTarget.value)} defaultValue={item.name}></input>
        <input className="inputs" placeholder="Acrônimo/Sigla..." onChange={(e => setAcronym(e.currentTarget.value))} defaultValue={item.acronym}></input>
        <input className="inputs" placeholder="Descrição" onChange={e => setDescription(e.currentTarget.value)} defaultValue={item.description}></input>
        <input className="inputs" placeholder="Endereço da imagem" onChange={e => setImage(e.currentTarget.value)} defaultValue={item.image}></input>
        <input className="inputs" placeholder="Frame" onChange={e => setPage(e.currentTarget.value)} defaultValue={item.page}></input>
        <button id={item.id} className="buttons" onClick={handleSubmit}>EDITAR</button> 
        <button id={item.id} className="buttons" onClick={handleDelete}>REMOVER</button> 
      </div>
      )
  } else {
    editArea = <></>
  }

  return (
    <div className=" rounded-xl p-2 flex flex-col gap-2">
      {editArea}
    </div>
  )
}