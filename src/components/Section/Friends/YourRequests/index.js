import React from "react";
import { CgClose } from "react-icons/cg";

export default function YourRequests ({item, index, handleRequest }) {
  return (
    <div className="item-list" key={index}>
      <div>
        {item.name}
      </div>
      <div className="flex gap-2">
        <CgClose
        onClick={e=>handleRequest(e, item)}
        className="text-red-500"
        />
      </div>
    </div>
  )
}