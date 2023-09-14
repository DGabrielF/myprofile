import React, { useState } from "react";

export default function Stats(user) {
  const [name, setName] = useState("");
  const [formula, setFormula] = useState("");

  async function handleSubmit(e) {
    try {

    } catch (error) {
      console.error('Erro ao enviar dados')
    }
  };

    
  return (    
  <div className="w-full h-full flex flex-col gap-1">
    Estatísticas
    <input className="inputs" placeholder="nome"></input>
    <input className="inputs" placeholder="fórmula"></input>
    <button className="buttons">ENVIAR</button>
  </div>
  )
}