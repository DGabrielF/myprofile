import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../firebase-config";

export default function EditApplication() {
  const [applications, setApplications] = useState([])
  useEffect(() => {fetchData(setApplications, "Applications")}, []);  return (
    <div className="bg-slate-500 rounded-xl p-2 flex flex-col gap-2">
      {applications.map((item, index) => {
          return (
            <div
            key={index}
            className="bg-zinc-600 px-2 rounded-xl">
              <div>
              {`${item.acronym} (${item.name})`}
              </div>
            </div>
          )
      })}
    </div>
  )
}