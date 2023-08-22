import React, { useEffect, useState } from "react";
import EditArea from "./EditArea";
import { FBDeleteDoc, FBFetchData, FBSingleQueryById, FBUpdateDoc } from "../../../../firebase-config";

export default function EditCouses() {
  const [skills, setSkills] = useState([]);
  const [openedItem, setOpenedItem] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState([]);
  
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [selfEvaluation, setSelfEvaluation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const coll = "Skills"

  let content;
  if (skills.length ===0 ) {
    content = "Ainda não há habilidades cadastrados"
  } else {
    content = (
      skills.map((item) => {
        return (
          <div
          id={item.id}
          key={item.id}
          onClick={(e) => handleEdit(e)}
          className="bg-zinc-600 px-2 rounded-xl group">
            {`${item.name}`}
            <EditArea
            setName={setName}
            setType={setType}
            setSelfEvaluation={setSelfEvaluation}
            setDescription={setDescription}
            setImage={setImage}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            item={item}
            openedItem={openedItem}
            editMode={editMode}
            />
          </div>
        )
      })
    )
  }

  function handleEdit (e) {
    if (editMode) {
      if (e.target.id === openedItem) {
        setEditMode(false);
      } else {
        setOpenedItem(e.currentTarget.id);
      }
    } else {
      setOpenedItem(e.currentTarget.id);
      setEditMode(true);
    }
    FBSingleQueryById(setSkillToEdit, coll, e.currentTarget.id);
  }

  function handleSubmit(e) {
    FBUpdateDoc(coll, e.currentTarget.id, {
      name: name?name:skillToEdit.name,
      type: type?type:skillToEdit.type,
      selfEvaluation: selfEvaluation?selfEvaluation:skillToEdit.selfEvaluation,
      description: description?description:skillToEdit.description,
      image: image?image:skillToEdit.image,
    })
  }

  function handleDelete(e) {
    FBDeleteDoc(coll, e.currentTarget.id)
    FBFetchData(setSkills, coll)
  }

  useEffect(() => {FBFetchData(setSkills, coll)}, []);
  return (
    <div className="bg-slate-500 rounded-xl p-2  mt-1 flex flex-col gap-2">
      {content}
    </div>
  )
}