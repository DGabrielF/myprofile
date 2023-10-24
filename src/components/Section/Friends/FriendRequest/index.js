import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { CgClose } from "react-icons/cg";

export default function FriendRequest ({item, index, handleAccept, handleReject}) {
  return (
    <div className="item-list" key={index}>
      <div>
        {item.name}
      </div>
      <div className="flex gap-2">
        <GiCheckMark
        onClick={e=>handleAccept(e, item)}
        className="text-lime-500"
        />
        <CgClose
        onClick={e=>handleReject(e, item)}
        className="text-red-500"
        />
      </div>
    </div>
  )
}