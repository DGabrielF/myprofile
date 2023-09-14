export default function CourseDetail( {item ,openedItem ,detailsMode, show, setShow} ) {
  let detailArea;

  function handleImage(e, item) {
    setShow(!show)
  }

  if (openedItem === item.id && detailsMode === true) {
    detailArea = (
      <div 
      id={item.id}
      className="bg-zinc-400 rounded-xl mt-1 flex flex-col gap-1 justify-around"
      >
        <div>
          Oferecido por: {item.issuer}
        </div>
        <div>
        Carga horária de {item.workload} {(Number(item.workload)>1)?"horas":"hora"}
        </div>
        {show?<img src={item.image} alt=""></img>:<></>}
        <button 
        id={item.name}
        className="buttons mb-2 w-[95%]"
        onClick={e => handleImage(e, item)}
        >
          {show?"Ocultar Certificado":"Ver Certificado"}</button>
      </div>
    )
  } else {
   detailArea = <></>
  }
  return (
    <>
      {detailArea}
    </>
  )
}