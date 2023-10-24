import React, { useEffect } from "react";
import { LiaStoreAltSolid } from "react-icons/lia";

export default function SMAHome() {
  useEffect(() => {document.title = 'Storeroom Monitoring App'}, []);
  return (    
  <div className="w-full flex flex-col bg-gradient-to-r from-zinc-800 to-zinc-700">
    <div className="flex justify-center items-center px-2 mt-2 mb-4">
      <LiaStoreAltSolid className="text-orange-500 h-[30px] w-[30px]"/>
      <div className="normal-text text-orange-500">
        Storeroom Monitoring Web Application
      </div>
      <LiaStoreAltSolid className="text-orange-500 h-[30px] w-[30px]"/>
    </div>
    <div className="normal-text text-orange-200">
      O assitente Storeroom Monitoring Web Application é um serviço online de apoio para o controle de estoques, idealizado em 20 de julho de 2023. Tem como funcinalidades registrar as entradas e saídas de produtos de um estoque, facilitar a vizualização de produtos disponíveis, uma lista com os produtos já elencados e outras informações inferidas a partir da análise de consumo.
    </div>
    <div className="normal-text text-orange-500 overflow-auto">
      <div>
        Ao clicar no SMA criar um banco de dados e levar o uid do usuário
        <li className="text-orange-300">limitar cada usuário a possuir no máximo 2 bancos de dados</li>

        <li className="text-orange-300">criar um sistema de solicitação, lista de solicitações, lista de requerimentos, lista de amigos</li>
      </div>
      <div>
        Criar uma lista de DB que possuem o uid na lista de permissões
        <li className="text-orange-300">verificar na lista de dbs do SMA se o uid do user está na lista de allowed</li>
        <li className="text-orange-300">guardar em uma lista de apresentação e dispor os itens</li>
        <li className="text-orange-300">só então chegar na página que está como home</li>
      </div>
    </div>

  </div>
  )
}