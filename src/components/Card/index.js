import React from "react";

export default function Card ( {item, index} ) {
  return (
    <div
    key={index}
    className="bg-slate-300 border-2 w-[300px] h-[360px] rounded-lg flex flex-col justify-between">
      <div
      className="mx-1 h-[75%] mt-1">
        <img 
        src={item.image}
        alt={`${item.acronym} (${item.name}): ${item.description}`}
        className="h-full mx-auto mt-2 rounded-lg">
        </img>
      </div>
      <div
      className="w-full mb-2 mx-2 text-center">
        {item.name}
      </div>
      <button
      className="mb-2 mx-2 bg-lime-300 rounded-lg">
        Access
      </button>
    </div>
  )
}