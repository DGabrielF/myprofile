import React from "react";
import { LiaStoreAltSolid } from "react-icons/lia";

export default function SMAHome() {
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
  </div>
  )
}