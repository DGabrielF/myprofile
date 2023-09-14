import React from "react";
import InputImageToDB from "../../../../InputImage";


export default function EditArea({setName, setIssuer, setWorkload, setDescription, setFinalDate, setImage, setPage, handleSubmit, handleDelete, item, openedItem, editMode}) {
  let editArea;
  
  if (openedItem === item.id && editMode === true) {
    editArea = (
      <div id={item.id}>
        <input className="inputs" placeholder="Nome do aplicação" onChange={e => setName(e.currentTarget.value)} defaultValue={item.name}></input>
        <input className="inputs" placeholder="Emissor" onChange={(e => setIssuer(e.currentTarget.value))} defaultValue={item.issuer}></input>
        <input className="inputs" placeholder="Carga horária" onChange={(e => setWorkload(e.currentTarget.value))} defaultValue={item.workload}></input>
        <input className="inputs" placeholder="Descrição" onChange={e => setDescription(e.currentTarget.value)} defaultValue={item.description}></input>
        <input className="inputs" placeholder="Data de término" onChange={e => setFinalDate(e.currentTarget.value)} defaultValue={item.finalDate}></input>
        <InputImageToDB
        image={item.image}
        setterFunction={setImage}
        />
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