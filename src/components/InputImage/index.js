import React from "react";

export default function InputImageToDB({ image, setterFunction }) {
  function onFileDrop(e) {
    e.stopPropagation();
    e.preventDefault()
    let convertedImages = [];

    for(let file of e.dataTransfer.files) {
      const fileRead = new FileReader();
      fileRead.onload = function(uploadedFile) {
        const image64 = uploadedFile.target.result;
        convertedImages.push(image64)
      }
      fileRead.readAsDataURL(file)
    }
    setterFunction(convertedImages)
  }
  return (
    <input
      placeholder="Arraste uma imagem"
      onDra
      onDrop={e => onFileDrop(e)}
      onChange={e => setterFunction(e.currentTarget.value)}
      value={image}
      className="inputs"
    >
    </input>
  )
}