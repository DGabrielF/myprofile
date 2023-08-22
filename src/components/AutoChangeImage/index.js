import React, { useState } from "react";

export default function AutoChangeImage({ image64List }) {
  const [nowId, setNowId] = useState(0);
  const [nowImg, setNowImg] = useState(image64List[nowId]);
  
  function imageUpdate() {
    if (image64List.length > 1) {
      (nowId === image64List.length-1)?setNowId(0):setNowId(nowId+1)
    }
    setTimeout(() => {
      setNowImg(image64List[nowId])
    }, 3000)
  }

  return (
    <img src={nowImg} alt=""
    onMouseOver={imageUpdate}
    className="w-full h-full"
    ></img>
    )
}