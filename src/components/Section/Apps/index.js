import React, { Component } from "react";

export default class Apps extends Component {
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
      Aplicações Web
    </div>
    )
  }
}