import React from "react";

export default class Root {
  constructor() {
    this.context = new Framer.Context({
      name: "root",
      width: 1000,
      height: 1000,
      backgroundColor: "red"
    });
  }
}
