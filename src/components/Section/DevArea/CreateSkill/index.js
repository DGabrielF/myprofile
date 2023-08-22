import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import InputImageToDB from "../../../InputImage";

export default function CreateSkill() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [selfEvaluation, setSelfEvaluation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const coll = "Skills"

  async function handleSubmit(e) {
    try {
      const docRef = await addDoc(collection(db, coll),   
      {
        name: name,
        selfEvaluation: selfEvaluation,
        description: description,
        image: image,
      }
      );
      console.log('Dados enviados com sucesso', docRef)
      setName("");
      setSelfEvaluation(0);
      setDescription();
      setImage("");
    } catch (error) {
      console.error('Erro ao enviar dados:', error)
    }
  }

  return (
    <div className="max-w-full min-w-[50%] flex flex-col items-center gap-1 overflow-hidden">
      <div className="text-md">Adicione informações básicas sobre a habilidade que deseja adicionar para facilitar sua busca em nosso banco de dados</div>
      <input className="inputs" placeholder="Habilidade" onChange={e => setName(e.currentTarget.value)} value={name}></input>
      <input className="inputs" placeholder="Categoria" onChange={e => setType(e.currentTarget.value)} value={type}></input>
      <input className="inputs" placeholder="Auto avaliação" onChange={(e => setSelfEvaluation(e.currentTarget.value))} defaultValue={selfEvaluation}></input>
      <input className="inputs" placeholder="Descrição" onChange={e => setDescription(e.currentTarget.value)} value={description}></input>
      <InputImageToDB 
      image={image}
      setterFunction={setImage}
      />
      <button className="buttons" onClick={handleSubmit}>CRIAR</button>
    </div>
  )
}
