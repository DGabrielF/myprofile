import React, { useEffect, useState } from "react";
import EditArea from "./EditArea";
import { FBDeleteDoc, FBFetchData, FBSingleQueryById, FBUpdateDoc } from "../../../../firebase-config";

export default function EditCouses() {
  const [courses, setCourses] = useState([]);
  const [openedItem, setOpenedItem] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState([]);

  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [workload, setWorkload] = useState("");
  const [description, setDescription] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [image, setImage] = useState([]);
  const [page, setPage] = useState("");

  const coll = "Courses"

  let content;
  if (courses.length ===0 ) {
    content = "Ainda não há cursos cadastrados"
  } else {
    content = (
      courses.map((item) => {
        return (
          <div
          id={item.id}
          key={item.id}
          onClick={(e) => handleEdit(e)}
          className="bg-zinc-600 px-2 rounded-xl group">
            {`${item.name}`}
            <EditArea
            setName={setName}
            setIssuer={setIssuer}
            setWorkload={setWorkload}
            setDescription={setDescription}
            setFinalDate={setFinalDate}
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
    FBSingleQueryById(setCourseToEdit, coll, e.currentTarget.id);
  }

  function handleSubmit(e) {
    FBUpdateDoc(coll, e.currentTarget.id, {
      name: name?name:courseToEdit.name,
      issuer: issuer?issuer:courseToEdit.issuer,
      workload: workload?workload:courseToEdit.workload,
      description: description?description:courseToEdit.description,
      finalDate: finalDate?finalDate:courseToEdit.finalDate,
      image: image?image:courseToEdit.image,
      page: page?page:courseToEdit.page,
    })
  }

  function handleDelete(e) {
    FBDeleteDoc(coll, e.currentTarget.id)
    FBFetchData(setCourses, coll)
  }

  useEffect(() => {FBFetchData(setCourses, coll)}, []);
  return (
    <div className="bg-slate-500 rounded-xl p-2  mt-1 flex flex-col gap-2">
      {content}
    </div>
  )
}