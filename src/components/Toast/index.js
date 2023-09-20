import React from "react"
import { GiCheckMark } from "react-icons/gi"
import { CgClose } from "react-icons/cg"
import { FaExclamation } from "react-icons/fa"


export default function Toast({toast}) {
  let content;
  let icon;
  if (toast.type === 'success') {
    icon = (
      <div className="w-[5%]">
        <GiCheckMark />
      </div>
    );
  } else if (toast.type === 'warning') {
    icon = (
      <div className="w-[5%]">
        <FaExclamation />
      </div>
    );
  } else if (toast.type === 'error') {
    icon = (
      <div className="w-[5%] font-extrabold">
        <CgClose />
      </div>
    );
  } else {
    return <></>
  }
  

  if (toast.isOn) {
    content = 
    <div className="toast">
      <div className={(toast.type === 'success')?"text-lime-600 titleToast":"text-orange-600 titleToast"}>
        {icon}
        <div>
          {toast.title.toUpperCase()}
        </div>
        {icon}
      </div>
      <div className={(toast.type === 'success')?"text-lime-600 messageToast":"text-orange-600 messageToast"}>
        {toast.message}
      </div>
    </div>
  } else {
    content = <></>
  }
  return (
    content
  )
}