import React, { useState, useEffect } from "react";
import { FBFetchData } from "../../../../firebase-config";

export default function ApplicationsList() {
  const [applications, setApplications] = useState([false]);
  let content;

  useEffect(() => {FBFetchData(setApplications, "Applications")}, []);

  if (applications[0] === false) {
    content = (
      <div>
        Carregando aplicações
      </div>
    )
  } else {
    if (applications.length === 0) {
      content =(
        <div>
          Nenhuma aplicação encontrada
        </div>
      )
    } else {
      content = (
        <>
          {applications.map((item, index) => {
            return (
              <div
              key={index}
              className="item-list">
                <div>
                {`${item.acronym} (${item.name}):`}
                </div>
                <div>
                {`${item.description}`}
                </div>
              </div>
            )
          })}
        </>
      )
    }
  }
  
  return (
    <div className="list">
      {content}
    </div>
  )
}