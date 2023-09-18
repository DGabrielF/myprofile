import React, { Component } from "react";
import ApplicationsList from "./ApplicationsList";
import CoursesList from "./CoursesList";

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
      className="normalText py-2">
        Olá galerinha, se você chegou até aqui provavelmente está buscando uma aplicação web que possa ajudar a facilitar o seu dia a dia ou está curioso para saber mais sobre o que tenho aprontado. De toda forma, sinta-se a vontade e qualquer coisa é só me chamar!!!
        Se você chegou aqui apenas por curiosidade, a listinha abaixo apresenta tudo que você pode encontrar neste site, e vale lembrar que somos uma Metamorfose Ambulante, então não custa nada dar uma olhada, vai que tem novidade...
      </div>
      <div
      className="normalText">
        APLICATIVOS
      </div>
      <div
      className="px-4">
        <ApplicationsList />
      </div>
      <div
      className="normalText">
        Para utilizar uma dessas aplicações basta acessar o menu, que se encontra no canto superior esquerdo da página e ir na seção de aplicações
      </div>
      <div className="normalText">
        Estatísticas:
          /comentar sobre as estatísticas e pra que elas servem
      </div>
      <div className="normalText">
        Sobre mim:
          <div className="flex flex-col">
            <div className="normalText">Há um espaço onde vocês também podem saber mais sobre mim, é só usar esse menu no canto superior esquerdo aqui do site e depois clicar em "About Me"</div>
            <div className="normalText">Lá vocês podem conhecer um pouco mais sobre a minha tragetória acadêmica, profissional. Como por exemplo:</div>
            <div className="normalText">CURSOS</div>
            <div className="px-2">
              <CoursesList />
            </div>
            <div className="normalText">Mas também, sobre coisas que eu gosto de fazer além do que a vida exige.</div>
            <div className="normalText">Hobbies</div>
          </div>
      </div>
    </div>
    )
  }
}