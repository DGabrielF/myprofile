import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../../../firebase-config";
import InputImageToDB from "../../../InputImage";

export default function CreateStatistic () {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [page, setPage] = useState("")

  const coll = "Statistics"

  async function handleSubmit(e) {
    try {
      const docRef = await addDoc(collection(db, coll),
      {
        name: name,
        description: description,
        image: image,
        page: page,
      }
      );
      console.log('Dados enviados com sucesso', docRef)
      setName("");
      setDescription("");
      setImage("");
      setPage("");
    } catch (error) {
      console.error('Erro ao enviar dados:', error)
    }
  }

  return (
    <div className="max-w-full min-w-[50%] flex flex-col items-center gap-1 overflow-hidden">
      <div className="text-md">Adicione informações básicas sobre a estatística que deseja adicionar para facilitar sua busca em nosso banco de dados</div>
      <input className="inputs" placeholder="Nome do aplicação" onChange={e => setName(e.currentTarget.value)} value={name}></input>
      <input className="inputs" placeholder="Descrição" onChange={e => setDescription(e.currentTarget.value)} value={description}></input>
      <InputImageToDB 
      image={image}
      setterFunction={setImage}
      />
      <input className="inputs" placeholder="Frame" onChange={e => setPage(e.currentTarget.value)} value={page}></input>
      <button className="buttons" onClick={handleSubmit}>CRIAR</button>
    </div>
  )
}