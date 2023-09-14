import React, { useState, useEffect } from "react";
import { FBFetchData } from "../../../../firebase-config";

export default function ApplicationsList() {
  const [applications, setApplications] = useState([])

  useEffect(() => {FBFetchData(setApplications, "Courses")}, []);
  
  return (
    <div className="bg-slate-500 rounded-xl p-2 flex flex-col gap-2">
      
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
            className="bg-slate-300 px-2 rounded-xl">
              <div>
              {`${item.name} oferecido por ${item.issuer}`}
              </div>
            </div>
          )
      })}
    </div>
  )
}