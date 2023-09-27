import React, { Component } from "react";
import ApplicationsList from "./ApplicationsList";
import CoursesList from "./CoursesList";
import SeparatorH from "../../SeparatorH";

export default class Initial extends Component {
  state = {
    item: {
      name:"",
      company:"",
      price:"",
      quantity:1,
    },
    itemsList: [],
  }

  render() {
    return (    
    <div className="w-full h-full">
      <div
      className="normal-text py-2">
        Olá galerinha, se você chegou até aqui provavelmente está buscando uma aplicação web que possa ajudar a facilitar o seu dia a dia ou está curioso para saber mais sobre o que tenho aprontado. De toda forma, sinta-se a vontade e qualquer coisa é só me chamar!!!
        Se você chegou aqui apenas por curiosidade, a listinha abaixo apresenta tudo que você pode encontrar neste site, e vale lembrar que somos uma Metamorfose Ambulante, então não custa nada dar uma olhada, vai que tem novidade...
      </div>
      <SeparatorH />
      <div className="max-h-[300px] normal-text flex flex-col sm:flex-row justify-between">
        <div className="sm:w-[45%]">
          <div className="normal-text">APLICATIVOS</div>
          <div
          className="px-4  h-[90%] overflow-auto">
            <ApplicationsList />
          </div>
        </div>

        <div className="sm:w-[45%]">
          <div className="normal-text">
            ESTATÍSTICAS
              /comentar sobre as estatísticas e pra que elas servem
          </div>
        </div>      
      </div>
      <SeparatorH />
      <div className="normal-text">Há um espaço onde vocês também podem saber mais sobre mim, é só usar esse menu no canto superior esquerdo aqui do site e depois clicar em "About Me"</div>
      <div className="normal-text">Lá vocês podem conhecer um pouco mais sobre a minha tragetória acadêmica, profissional. Mas também, sobre coisas que eu gosto de fazer além do que a vida exige.</div>
      <div className="max-h-[300px] normal-text flex flex-col sm:flex-row justify-between">
        <div className="sm:w-[45%]">
          <div className="normal-text">CURSOS</div>
          <div className="px-4 h-[90%] overflow-auto">
            <CoursesList />
          </div>
        </div>
        <div className="sm:w-[50%]">
          <div className="normal-text">HOBBIES</div>
        </div>
      </div>





    </div>
    )
  }
}