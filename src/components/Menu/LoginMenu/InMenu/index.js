import React from "react";

export default function InMenu({handleModal}) {
  return (
    <div className="flex gap-2">
      <button name="signout"
      onClick={(e) => handleModal(e)}>
        Sign out
      </button>
    </div>
  )
}