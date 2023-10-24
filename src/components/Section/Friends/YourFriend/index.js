import React from "react";
import { CgClose } from "react-icons/cg";

export default function YourFriend ({item, index, handleDelete}) {
  return (
    <div className="item-list" key={index}>
      <div>
        {item.name}
      </div>
      <div className="flex gap-2">              
        <CgClose
        onClick={e=>handleDelete(e, item)}
        className="text-red-500"
        />
      </div>
    </div>
  )
}