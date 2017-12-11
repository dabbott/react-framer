import React from "react";

const rootName = (() => {
  let base = 0;
  return () => `Context${base++}`;
})();

export default class Root {
  constructor(props) {
    this.context = new Framer.Context({
      name: rootName(),
      ...props
    });
  }
}
