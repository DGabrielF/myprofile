import React from "react";
import { FiPlus } from "react-icons/fi";

export default function FriendToAdd ({user, item, index, handleAdd}) {
  return (
    <div className="item-list" key={item.uid}>
      <div>
        {item.name}
      </div>
      <div className="flex gap-2">
        <FiPlus
        onClick={e=>handleAdd(e, user, item)}
        className="text-blue-500"
        />
      </div>
    </div>
  )
}