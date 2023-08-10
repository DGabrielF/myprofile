import React, { useEffect, useState } from "react";
import { FBFetchData, FBSingleQueryById, FBUpdateDoc, FBDeleteDoc } from "../../../../firebase-config";
import EditArea from "../EditArea";

export default function EditApplication() {
  const [applications, setApplications] = useState([]);
  const [openedItem, setOpenedItem] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [applicationToEdit, setApplicationToEdit] = useState([]);

  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [page, setPage] = useState("");

  function handleEdit (e) {
    if (editMode) {
      if (e.target.id === openedItem) {
        console.log(e.currentTarget)
        setEditMode(false);
      } else {
        setOpenedItem(e.currentTarget.id);
      }
    } else {
      setOpenedItem(e.currentTarget.id);
      setEditMode(true);
    }

    FBSingleQueryById(setApplicationToEdit, "Applications", e.currentTarget.id);
  }

  function handleSubmit(e) {
    FBUpdateDoc('Applications', e.currentTarget.id, {
      name: name?name:applicationToEdit.name,
      acronym: acronym?acronym:applicationToEdit.acronym,
      description: description?description:applicationToEdit.description,
      image: image?image:applicationToEdit.image,
      page: page?page:applicationToEdit.page,
    })
  }

  function handleDelete(e) {
    FBDeleteDoc('Applications', e.currentTarget.id)
    // Pagina de confirmação de excluir e atualizar a página
  }

  

  useEffect(() => {FBFetchData(setApplications, "Applications")}, []);
  return (
    <div className="bg-slate-500 rounded-xl p-2 flex flex-col gap-2">
      {applications.map((item, index) => {
          return (
            <div
            id={item.id}
            key={item.id}
            onClick={(e) => handleEdit(e)}
            className="bg-zinc-600 px-2 rounded-xl group">
              {`${item.acronym} (${item.name})`}
              <EditArea 
              setName={setName}
              setAcronym={setAcronym}
              setDescription={setDescription}
              setImage={setImage}
              setPage={setPage}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
              item={item}
              openedItem={openedItem}
              editMode={editMode}
              />
            </div>
          )
      })}
    </div>
  )
}