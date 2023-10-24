import { doc, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase-config";

export default function Stats(user) {
  const [name, setName] = useState("");
  const [formula, setFormula] = useState("");
  const coll = "TESTE";

  async function handleSubmit(e) {
    try {

    } catch (error) {
      console.error('Erro ao enviar dados')
    }
  };

  const createNewDB = async (e) => {
    try {
      await addDoc(collection(db, coll),{
        name: "usuário",
      });
    } catch (error) {
      console.log(error)
    }
  }

  const createData = async (e) => {
    try {
      const DB = doc(db, "TESTE", "GWkyMRXHT0g2ZmHmCBhK")
      await addDoc(collection(DB, 'testinho'),{
        idade: "12",
        genero: "N",
      });
      console.log("feito")
    } catch (error) {
      console.log(error)
    }
  }
    
  return (    
  <div className="w-full h-full flex flex-col gap-1">
    Estatísticas
    <input className="inputs" placeholder="nome"></input>
    <input className="inputs" placeholder="fórmula"></input>
    <button className="buttons" onClick={e => createNewDB(e)}>New DB</button>
    <button className="buttons" onClick={e => createData(e)}>New Data</button>
  </div>
  )
}