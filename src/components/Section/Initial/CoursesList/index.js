import React, { useState, useEffect } from "react";
import { FBFetchData } from "../../../../firebase-config";

export default function ApplicationsList() {
  const [applications, setApplications] = useState([false])
  let content;

  useEffect(() => {FBFetchData(setApplications, "Courses")}, []);
  
  if (applications[0] === false) {
    content = (
      <div>
        Carregando cursos
      </div>
    )
  } else {
    if (applications.length === 0) {
      content = (
        <div>
          Nenhum curso encontrado
        </div>
      )
    } else {
      content = (
        <>
          {applications.sort( (a, b) => {
              if (a.name < b.name) {
                return -1;
              } else {
                return true;
              }
            }).map((item, index) => {
              return (
                <div
                key={index}
                className="item-list">
                  <div>
                  {`${item.name} oferecido por ${item.issuer}`}
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