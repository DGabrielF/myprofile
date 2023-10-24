import React from "react";
import { CgClose } from "react-icons/cg";

export default function BlockList ({item, index, handleRestore }) {
  return (
    <div className="item-list" key={index}>
      <div>
        {item.name}
      </div>
      <div className="flex gap-2">
        <CgClose
        onClick={e=>handleRestore(e, item)}
        className="text-blue-500"
        />
      </div>
    </div>
  )
}