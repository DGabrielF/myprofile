import React, { useEffect, useState } from "react";
import { FBFetchData, FBSingleQueryById, FBUpdateDoc, FBDeleteDoc } from "../../../../firebase-config";
import EditArea from "./EditArea";

export default function EditStatistic() {
  const [statistics, setStatistics] = useState([]);
  const [openedItem, setOpenedItem] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [statisticToEdit, setStatisticToEdit] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [page, setPage] = useState("");

  const coll = "Statistics"

  let content;
  if (statistics.length === 0) {
    content = "Ainda não há aplicações cadastradas"
  } else {
    content = (
      statistics.map((item) => {
        return (
          <div
          id={item.id}
          key={item.id}
          onClick={(e) => handleEdit(e)}
          className="bg-zinc-600 px-2 rounded-xl group">
            {item.name}
            <EditArea 
            setName={setName}
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
    FBSingleQueryById(setStatisticToEdit, coll, e.currentTarget.id);
  }

  function handleSubmit(e) {
    FBUpdateDoc(coll, e.currentTarget.id, {
      name: name?name:statisticToEdit.name,
      description: description?description:statisticToEdit.description,
      image: image?image:statisticToEdit.image,
      page: page?page:statisticToEdit.page,
    })
  }

  function handleDelete(e) {
    FBDeleteDoc(coll, e.currentTarget.id)
    FBFetchData(setStatistics, coll)
  }

  useEffect(() => {FBFetchData(setStatistics, coll)}, []);
  return (
    <div className="bg-slate-500 rounded-xl p-2 mt-1 flex flex-col gap-2">
      {content}
    </div>
  )
}