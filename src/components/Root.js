import React from "react";

const rootName = (() => {
  let base = 0;
  return () => `Context${base++}`;
})();

export default class Root {
  constructor(props) {
    this.children = [];
    this.context = new Framer.Context({
      name: rootName(),
      ...props
    });
  }

  appendChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    this.children = this.children.filter(item => item === child);
  }

  mountChildren() {
    this.context.run(() => {
      this.children.forEach(child => child.mount());
    });
  }
}
