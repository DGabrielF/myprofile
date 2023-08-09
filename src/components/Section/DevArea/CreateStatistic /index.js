import React, { useState } from "react";

export default function CreateStatistic () {
  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [page, setPage] = useState(<></>)


  return (
    <div className="max-w-full min-w-[50%] flex flex-col items-center gap-1 overflow-hidden">
      <div className="font-extrabold text-md">ADICIONANDO UMA APLICAÇÃO</div>
      <input className="inputs" placeholder="Nome do aplicação"></input>
      <input className="inputs" placeholder="Acrônimo/Sigla..."></input>
      <input className="inputs" placeholder="Descrição"></input>
      <input className="inputs" placeholder="Endereço da imagem"></input>
      <input className="inputs" placeholder="Frame"></input>
      <button className="buttons">CRIAR</button>
    </div>
  )
}