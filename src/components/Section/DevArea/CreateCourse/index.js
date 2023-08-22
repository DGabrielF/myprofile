import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import InputImageToDB from "../../../InputImage";

export default function CreateCourse () {
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [workload, setWorkload] = useState("");
  const [description, setDescription] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [image, setImage] = useState([]);
  const [page, setPage] = useState("");

  const coll = "Courses"

  async function handleSubmit(e) {
    try {
      const docRef = await addDoc(collection(db, coll),   
      {
        name: name,
        issuer: issuer,
        workload: workload,
        description: description,
        finalDate: finalDate,
        image: image,
        page: page,
      }
      );
      console.log('Dados enviados com sucesso', docRef)
      setName("");
      setIssuer("");
      setWorkload("");
      setDescription("");
      setFinalDate("")
      setImage("");
      setPage("");
    } catch (error) {
      console.error('Erro ao enviar dados:', error)
    }
  };

  return (
    <div className="max-w-full min-w-[50%] flex flex-col items-center gap-1 overflow-hidden">
    <div className="text-md">Adicione informações básicas sobre o curso que deseja adicionar para facilitar sua busca em nosso banco de dados</div>
    <input className="inputs" placeholder="Nome do curso" onChange={e => setName(e.currentTarget.value)} value={name}></input>
    <input className="inputs" placeholder="Emissor" onChange={(e => setIssuer(e.currentTarget.value))} value={issuer}></input>
    <input className="inputs" placeholder="Carga horária" onChange={(e => setWorkload(e.currentTarget.value))} value={workload}></input>
    <input className="inputs" placeholder="Descrição" onChange={e => setDescription(e.currentTarget.value)} value={description}></input>
    <input className="inputs" placeholder="Data de término" onChange={e => setFinalDate(e.currentTarget.value)} value={finalDate}></input>
    <InputImageToDB 
    image={image}
    setterFunction={setImage}
    />
    <input className="inputs" placeholder="Frame" onChange={e => setPage(e.currentTarget.value)} value={page}></input>
    <button className="buttons" onClick={handleSubmit}>CRIAR</button>
  </div>

  )
}
