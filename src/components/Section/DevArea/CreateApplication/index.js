import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../../firebase-config";

export default function CreateApplication () {
  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [page, setPage] = useState("");

  async function handleSubmit(e) {
    try {
      const docRef = await addDoc(collection(db, 'Applications'),    
      {
        name: name,
        acronym: acronym,
        description: description,
        image: image,
        page: page,
      }
      );
      console.log('Dados enviados com sucesso', docRef)
      setName("");
      setAcronym("");
      setDescription("");
      setImage("");
      setPage("");
    } catch (error) {
      console.error('Erro ao enviar dados:', error)
    }
  }
  return (
    <div className="max-w-full min-w-[50%] flex flex-col items-center gap-1 overflow-hidden">
      <div className="font-extrabold text-md">ADICIONANDO UMA APLICAÇÃO</div>
      <input className="inputs" placeholder="Nome do aplicação" onChange={e => setName(e.currentTarget.value)} value={name}></input>
      <input className="inputs" placeholder="Acrônimo/Sigla..." onChange={(e => setAcronym(e.currentTarget.value))} value={acronym}></input>
      <input className="inputs" placeholder="Descrição" onChange={e => setDescription(e.currentTarget.value)} value={description}></input>
      <input className="inputs" placeholder="Endereço da imagem" onChange={e => setImage(e.currentTarget.value)} value={image}></input>
      <input className="inputs" placeholder="Frame" onChange={e => setPage(e.currentTarget.value)} value={page}></input>
      <button className="buttons" onClick={handleSubmit}>CRIAR</button> 
      Agora só falta criar um caminho para armazenar os dados dos apps no firebase e testar se um componente do react consegue voltar e ser utilizado direto no código
    </div>
  )
}