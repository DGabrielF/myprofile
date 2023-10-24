import React, { useEffect, useState } from "react";
import { FBFetchData } from "../../../firebase-config";
import SMA from "./SMA";
import Loading from "../../Loading";

export default function Apps ({user}) {
  const [sideBar, setSideBar] = useState(false);
  const [appList, setAppList] = useState(true);
  const [applications, setApplications] = useState([false]);
  const [page, setPage] = useState('none')
  let content;
  let app;

  useEffect(() => {FBFetchData(setApplications, "Applications")}, []);
  useEffect(() => {document.title = 'DGF - Aplicações'}, []);

  function handlePage (e, item) {
    setAppList(false)
    setPage(item.page)
  }

  if (applications[0] === false) {
    content = (
      <div>
        Carregando aplicações <Loading />
      </div>
    )
  } else {
    if (applications.length === 0) {
      content = (
        <div>
          Nenhuma aplicação encontrada
        </div>
      )
    } else {
      content = (
        <div className="w-full h-full flex flex-col items-center py-4">
        {applications.map((item, index) => {
          return (
            <div
            key={index}
            className="px-1 w-80 h-96 rounded-2xl flex flex-col justify-around">
              <div
              className="h-[95%] flex flex-col">
                <div
                className="bg-zinc-500 h-[9%] text-center rounded-t-lg font-bold">
                  {item.acronym}
                </div>
                <div
                className="h-[80%] bg-zinc-600 rounded-lg flex items-center justify-center">    
                  <img src={item.image} alt={item.description} className="h-full"></img>
                </div>
                <div
                className="bg-blue-500 h-[9%] text-center rounded-b-lg">
                  {`${item.name}`}
                </div>
              </div>
              <button onClick={(e) => {handlePage(e, item)}} className="buttons m-0">ABRIR</button>
            </div>
          )
        })}
      </div>
      )
    }
  }

  if (page === 'sma') {
    app = <SMA user={user} />
  } 
  return (    
    <>{appList?content:app}</>
  )
}
