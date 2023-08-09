import React, { Component } from "react";
import ApplicationsList from "./ApplicationsList";

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
      <div>
        Página Inicial
      </div>
      <div>
        Olá galerinha, se você chegou até aqui provavelmente está buscando uma aplicação web que possa ajudar a facilitar o seu dia a dia ou está curioso para saber mais sobre o que tenho aprontado. De toda forma, sinta-se a vontade e qualquer coisa é só me chamar!!!
        Se você chegou aqui apenas por curiosidade, a listinha abaixo apresenta tudo que você pode encontrar neste site, e vale lembrar que somos uma Metamorfose Ambulante, então não custa nada dar uma olhada, vai que tem novidade...
      </div>
      <div>
        Aplicativos:
        <ApplicationsList />
        Para utilizar uma dessas aplicações basta acessar o menu, que se encontra no canto superior esquerdo da página e ir na seção de aplicações
      </div>
      <div>
        Estatísticas:
          /comentar sobre as estatísticas e pra que elas servem
      </div>
      <div>
        Sobre mim:
          <div className="flex flex-col">
            <div>Apresentação</div>
            <div>Currículo</div>
            <div>Cursos</div>
            <div>Hobbies</div>
          </div>
      </div>
    </div>
    )
  }
}