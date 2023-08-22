import React from "react";
import InputImageToDB from "../../../../InputImage";


export default function EditArea({setName, setType, setSelfEvaluation, setDescription,  setImage,  handleSubmit, handleDelete, item, openedItem, editMode}) {
  let editArea;
  if (openedItem === item.id && editMode === true) {
    editArea = (
      <div className="max-w-full min-w-[50%] flex flex-col items-center gap-1 overflow-hidden">
        <div className="text-md">Adicione informações básicas sobre a habilidade que deseja adicionar para facilitar sua busca em nosso banco de dados</div>
        <input className="inputs" placeholder="Habilidade" onChange={e => setName(e.currentTarget.value)} value={item.name}></input>
        <input className="inputs" placeholder="Categoria" onChange={e => setType(e.currentTarget.value)} value={item.name}></input>
        <input className="inputs" placeholder="Auto avaliação" onChange={(e => setSelfEvaluation(e.currentTarget.value))} defaultValue={item.selfEvaluation}></input>
        <input className="inputs" placeholder="Descrição" onChange={e => setDescription(e.currentTarget.value)} value={item.description}></input>
        <InputImageToDB 
        image={item.image}
        setterFunction={setImage}
        />
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