import React from "react";

export default function OutMenu({handleModal}) {
  return (
    <div className="flex gap-2">
      <button name="signin"
      onClick={(e) => handleModal(e)}>
        Sign in
      </button>
      <button name="signup"
      onClick={(e) => handleModal(e)}>
        Sign up
      </button>
    </div>
    )
}