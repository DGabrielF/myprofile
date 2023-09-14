import React, { useEffect, useState } from "react";
import { FBFetchData } from "../../../../firebase-config";
import CourseDetail from "./CourseDetail";

export default function Courses () {
  const [courses, setCourses] = useState([]);
  const [openedItem, setOpenedItem] = useState("");
  const [show, setShow] = useState(false);
  const [detailsMode, setDetailsMode] = useState(false);

  const coll = "Courses"
  
  function handleDetails(e) {
    if (detailsMode) {
      if (e.target.id === openedItem) {
        setDetailsMode(false);
      } else {
        setOpenedItem(e.currentTarget.id);
      }
    } else {
      setOpenedItem(e.currentTarget.id);
      setDetailsMode(true)
    }
  }

  let content;
  if (courses.length === 0 ) {
    content = "Ainda não há cursos cadastrados"
  } else {
    content = (
      courses.map((item) => {
        return (
          <div
          id={item.id}
          key={item.id}
          onClick={e => handleDetails(e, item)}
          className="bg-zinc-500 px-2 rounded-xl group my-2">
          {item.name}
          <CourseDetail 
          item = {item}
          openedItem = {openedItem}
          detailsMode = {detailsMode}
          show = {show}
          setShow = {setShow}
          />
          </div>
        )
      })
    )
  }

  useEffect(() => {FBFetchData(setCourses, coll)}, []);
  return (
    <div>
      {content}
    </div>
  )
}